// WebMCP: exposes the calculator to AI agents running in the browser.
// The API is experimental (Chrome "Intent to Experiment"), so everything here is feature-detected
// and does nothing in browsers without it. Docs: https://developer.chrome.com/docs/ai/webmcp/imperative-api

import { buildUpPlan, calculate, explain, goalById, goals, type CalculatorInput, type GoalId } from './goals'

type ToolResponse = { content: { type: 'text'; text: string }[] }

type WebMcpTool = {
  name: string
  description: string
  inputSchema: object
  annotations?: { readOnlyHint?: boolean }
  execute: (input: Record<string, unknown>) => ToolResponse | Promise<ToolResponse>
}

type ModelContext = {
  registerTool: (tool: WebMcpTool, options?: { signal?: AbortSignal }) => unknown
  unregisterTool?: (name: string) => void
}

export const kcalOptions = [150, 250, 350] as const
export type KcalOption = (typeof kcalOptions)[number]

/** Values the tool fills in on the page, in metric units. */
export type ToolInput = {
  goal: GoalId
  currentSteps: number
  age: number
  weightKg: number
  heightCm: number
  extraKcal: KcalOption
  priorSteps: number
  /** Null means the recommended pace. */
  weeks: number | null
}

export const toolName = 'calculate_step_goal'

const inputSchema = {
  type: 'object',
  properties: {
    goal: {
      type: 'string',
      enum: goals.map((goal) => goal.id),
      description: goals.map((goal) => `${goal.id}: ${goal.label}`).join('; '),
    },
    currentSteps: { type: 'number', minimum: 0, maximum: 40000, description: 'Average daily steps over the last week or two.' },
    age: { type: 'number', minimum: 18, maximum: 100, description: 'Age in years. Used by the longevity goal. Defaults to 40.' },
    weightKg: { type: 'number', minimum: 30, maximum: 300, description: 'Body weight in kg. Used by the weight-loss goal. Defaults to 80.' },
    heightCm: { type: 'number', minimum: 120, maximum: 230, description: 'Height in cm. Used by the weight-loss goal. Defaults to 172.' },
    extraKcal: {
      type: 'number',
      enum: [...kcalOptions],
      description: 'Weight-loss goal only: extra calories a day the walking should burn. Defaults to 250.',
    },
    priorSteps: {
      type: 'number',
      minimum: 0,
      maximum: 40000,
      description: 'Recovery goal only: typical daily steps before the surgery, injury or illness. Defaults to 8,000.',
    },
    weeks: {
      type: 'number',
      minimum: 1,
      maximum: 52,
      description: 'Optional: weeks to build up to the goal. Leave out for the recommended pace.',
    },
  },
  required: ['goal', 'currentSteps'],
} as const

const clamp = (value: unknown, min: number, max: number, fallback: number) => {
  const number = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback
}

/** Turns loose agent input into the same bounded values the on-page fields allow. */
export function parseToolInput(raw: Record<string, unknown>): ToolInput {
  const goal = typeof raw.goal === 'string' && raw.goal in goalById ? (raw.goal as GoalId) : null
  if (!goal) throw new Error(`goal must be one of: ${goals.map((g) => g.id).join(', ')}`)
  const kcal = clamp(raw.extraKcal, 0, 1000, 250)
  const extraKcal = kcalOptions.reduce((best, option) => (Math.abs(option - kcal) < Math.abs(best - kcal) ? option : best))
  return {
    goal,
    currentSteps: Math.round(clamp(raw.currentSteps, 0, 40000, 5000)),
    age: Math.round(clamp(raw.age, 18, 100, 40)),
    weightKg: Math.round(clamp(raw.weightKg, 30, 300, 80)),
    heightCm: Math.round(clamp(raw.heightCm, 120, 230, 172)),
    extraKcal,
    priorSteps: Math.round(clamp(raw.priorSteps, 0, 40000, 8000)),
    weeks: raw.weeks === undefined || raw.weeks === null ? null : Math.round(clamp(raw.weeks, 1, 52, 1)),
  }
}

/** Runs the same calculation the page shows and returns it as a plain object. */
export function runTool(input: ToolInput) {
  const calcInput: CalculatorInput = {
    goal: input.goal,
    currentSteps: input.currentSteps,
    age: input.age,
    weightKg: input.weightKg,
    heightCm: input.heightCm,
    extraKcal: input.extraKcal,
    priorSteps: input.priorSteps,
  }
  const result = calculate(calcInput)
  const plan = buildUpPlan(input.goal, result, input.weeks)
  const goal = goalById[input.goal]
  return {
    goal: goal.label,
    dailyStepGoal: result.target,
    stepsAboveToday: result.extraSteps,
    extraBriskWalkingMinutes: result.extraMinutes,
    ...(result.kcalPer1000Steps !== undefined && { kcalPer1000Steps: result.kcalPer1000Steps }),
    ...(result.kgPerWeek !== undefined && { kgPerWeek: Number(result.kgPerWeek.toFixed(2)) }),
    buildUp:
      plan.recommendedWeeks > 0
        ? {
            weeks: plan.weeks,
            stepsToAddEachWeek: plan.perWeek,
            recommendedWeeks: plan.recommendedWeeks,
            fasterThanRecommended: plan.tooFast,
          }
        : null,
    ...(result.warning && { warning: result.warning }),
    howItIsCalculated: explain(calcInput, result),
    evidence: goal.evidence,
    sources: goal.sources.map((source) => ({ title: source.label, url: source.url })),
    disclaimer: 'General guidance from population research, not medical advice.',
  }
}

function modelContext(): ModelContext | undefined {
  if (typeof window === 'undefined') return undefined
  // The spec draft has moved between navigator and document; accept either.
  const candidates = [(navigator as { modelContext?: ModelContext }).modelContext, (document as { modelContext?: ModelContext }).modelContext]
  return candidates.find((candidate) => typeof candidate?.registerTool === 'function')
}

/**
 * Registers the calculator tool if the browser supports WebMCP.
 * `onRun` receives the parsed input so the page can show the same result on screen.
 * Returns a cleanup function that unregisters the tool.
 */
export function registerStepGoalTool(onRun: (input: ToolInput) => void): () => void {
  const context = modelContext()
  if (!context) return () => {}

  const controller = new AbortController()
  try {
    context.registerTool(
      {
        name: toolName,
        description:
          'Work out how many steps a day someone needs for a goal (weight loss, keeping weight off, living longer, heart and blood sugar, mood, knee arthritis, or recovery after surgery or injury), with a week-by-week build-up plan. Uses the same research and math as the calculator on this page, and shows the result on screen.',
        inputSchema,
        annotations: { readOnlyHint: true },
        execute: (raw) => {
          const input = parseToolInput(raw ?? {})
          onRun(input)
          return { content: [{ type: 'text', text: JSON.stringify(runTool(input)) }] }
        },
      },
      { signal: controller.signal }
    )
  } catch {
    // An older or newer draft of the API rejected the call; the page works the same without it.
    return () => {}
  }

  return () => {
    controller.abort()
    try {
      context.unregisterTool?.(toolName)
    } catch {
      // Already removed by the abort signal.
    }
  }
}
