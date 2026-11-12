/**
 * The goal types the step goal calculator knows, the research each one rests
 * on, and the arithmetic that turns someone's inputs into a daily target and a
 * week-by-week ramp.
 *
 * Kept free of React so the page (server) and the calculator (client) read the
 * same numbers, and so the FAQ and the evidence table can never drift from
 * what the tool actually computes.
 */

export type GoalId = 'weight-loss' | 'keep-weight-off' | 'longevity' | 'heart-metabolic' | 'mood' | 'knee' | 'recovery'

export type Source = {
  label: string
  url: string
}

export type Goal = {
  id: GoalId
  label: string
  /** One line under the label in the goal picker. */
  short: string
  /** How the target is set, in plain words, for the evidence table. */
  rule: string
  /** What the research says, for the evidence table and the result card. */
  evidence: string
  sources: readonly Source[]
}

const sources = {
  ding: {
    label: 'Ding et al., Lancet Public Health (2025): daily steps and health outcomes, 57 studies',
    url: 'https://doi.org/10.1016/S2468-2667(25)00164-1',
  },
  paluch: {
    label: 'Paluch et al., Lancet Public Health (2022): daily steps and all-cause mortality, 15 cohorts',
    url: 'https://doi.org/10.1016/S2468-2667(21)00302-9',
  },
  acsm: {
    label: 'Donnelly et al., ACSM position stand (2009): physical activity for weight loss and regain prevention',
    url: 'https://pubmed.ncbi.nlm.nih.gov/19127177/',
  },
  regain: {
    label: 'Meta-analysis of 18 trials on daily steps and weight regain, European Congress on Obesity (2026)',
    url: 'https://www.sciencedaily.com/releases/2026/05/260510234655.htm',
  },
  depression: {
    label: 'Bizzozero-Peroni et al., JAMA Network Open (2024): daily step count and depression, 33 studies',
    url: 'https://doi.org/10.1001/jamanetworkopen.2024.51208',
  },
  knee: {
    label: 'White et al., Arthritis Care & Research (2014): steps per day and functional limitation in knee OA',
    url: 'https://doi.org/10.1002/acr.22362',
  },
  tudorLocke: {
    label: 'Tudor-Locke et al., IJBNPA (2011): how many steps/day are enough for older adults and special populations',
    url: 'https://doi.org/10.1186/1479-5868-8-80',
  },
} satisfies Record<string, Source>

export const goals: readonly Goal[] = [
  {
    id: 'weight-loss',
    label: 'Lose weight',
    short: 'Burn a set number of extra calories each day',
    rule: 'Your current steps, plus enough extra steps to burn the daily calories you pick. Calories per step scale with your weight and stride.',
    evidence:
      'Walking alone moves the scale slowly; eating is the bigger lever. The ACSM finds 150–250 minutes a week of moderate activity gives only modest loss, and more than 250 minutes a week is linked to clinically meaningful loss. That is roughly 3,500 or more brisk steps a day on top of what you already walk.',
    sources: [sources.acsm],
  },
  {
    id: 'keep-weight-off',
    label: 'Keep weight off',
    short: 'Hold a loss you have already made',
    rule: 'About 8,500 steps a day, or your current average if it is already higher.',
    evidence:
      'Across 18 weight-loss trials, people who walked more kept more of their loss: roughly 1% more of it for every extra 1,000 daily steps. Around 8,500 steps a day was the level linked to keeping weight off the longest. Activity mattered more for keeping weight off than for losing it.',
    sources: [sources.regain, sources.acsm],
  },
  {
    id: 'longevity',
    label: 'Live longer',
    short: 'General health and lower all-cause risk',
    rule: '8,000 steps a day under 60, 7,000 a day at 60 and over.',
    evidence:
      'Risk of dying from any cause falls as daily steps rise, then levels off: around 6,000–8,000 steps for adults 60 and over, and 8,000–10,000 for younger adults. A 2025 review of 57 studies found 7,000 steps a day was linked to about 47% lower risk than 2,000, and even 4,000 beat 2,000.',
    sources: [sources.paluch, sources.ding],
  },
  {
    id: 'heart-metabolic',
    label: 'Heart and blood sugar',
    short: 'Cardiovascular health and type 2 diabetes risk',
    rule: '7,000 steps a day, with a short walk after your largest meals counting toward it.',
    evidence:
      'The 2025 review found that around 7,000 steps a day was linked to lower risk across its outcomes, including cardiovascular disease and type 2 diabetes. A 10-minute walk after a meal (about 1,000 steps) blunts the blood sugar rise from that meal, so where you put the steps matters as well as how many.',
    sources: [sources.ding],
  },
  {
    id: 'mood',
    label: 'Mood',
    short: 'Lower risk of depressive symptoms',
    rule: '7,000 steps a day.',
    evidence:
      'Pooling 33 studies, adults who walked 7,000 or more steps a day had about 31% lower risk of depression than those under 7,000, and each extra 1,000 steps was linked to about 9% lower risk. Fewer symptoms already showed up from around 5,000 steps.',
    sources: [sources.depression],
  },
  {
    id: 'knee',
    label: 'Knee arthritis',
    short: 'Stay mobile with knee osteoarthritis',
    rule: 'Work up to 6,000 steps a day, starting from at least 3,000.',
    evidence:
      'In 1,788 people with or at risk of knee osteoarthritis, walking under 6,000 steps a day best predicted who developed difficulty with daily activities two years later. Each extra 1,000 steps was linked to a 16–18% lower risk. The researchers suggest starting at 3,000 and building toward 6,000.',
    sources: [sources.knee],
  },
  {
    id: 'recovery',
    label: 'Recover after surgery or injury',
    short: 'Rebuild to your old normal, slowly',
    rule: 'Your usual steps before the surgery, injury, or illness, reached in small weekly increases.',
    evidence:
      'There is no single recovery number, and your care team’s limits come first. What the research supports is a gradual build: step-count programmes in people with chronic conditions raised daily steps by about 2,200 on average, and getting moving after an operation is linked to fewer complications. The ramp here is deliberately smaller than for other goals.',
    sources: [sources.tudorLocke],
  },
]

export const goalById = Object.fromEntries(goals.map((goal) => [goal.id, goal])) as Record<GoalId, Goal>

export type CalculatorInput = {
  goal: GoalId
  /** Average daily steps over the last week or two. */
  currentSteps: number
  age: number
  weightKg: number
  heightCm: number
  /** Weight loss only: extra calories a day the walking should burn. */
  extraKcal: number
  /** Recovery only: typical daily steps before the setback. */
  priorSteps: number
}

export type RampWeek = {
  week: number
  steps: number
}

export type CalculatorResult = {
  target: number
  /** Target minus current steps; zero or negative means already there. */
  extraSteps: number
  /** Extra steps as minutes of brisk walking at 100 steps a minute. */
  extraMinutes: number
  /** Weekly step increase used for the ramp. */
  weeklyIncrease: number
  ramp: readonly RampWeek[]
  /** Weight loss only. */
  kcalPer1000Steps?: number
  /** Weight loss only: kg a week the extra calories would add up to if everything else stayed the same. */
  kgPerWeek?: number
  /** Set when the target is beyond what is reasonable to walk. */
  warning?: string
}

/** Brisk walking cadence. 100 steps a minute is the research threshold for moderate intensity. */
export const stepsPerMinute = 100
/** Energy in a kilogram of body fat, the figure most weight-loss arithmetic uses. */
const kcalPerKgFat = 7700
/** Net energy cost of walking on the flat, above resting, per kg of body weight per km. */
const netKcalPerKgPerKm = 0.5
const maxTarget = 20000

const roundTo = (value: number, step: number) => Math.round(value / step) * step

/** Walking stride length estimated from height, in metres. */
export function strideMetres(heightCm: number) {
  return (heightCm / 100) * 0.415
}

/** Net calories burned per 1,000 steps for this body. */
export function kcalPer1000Steps(weightKg: number, heightCm: number) {
  // 1,000 strides of `strideMetres` is exactly that many kilometres.
  return netKcalPerKgPerKm * weightKg * strideMetres(heightCm)
}

function weeklyIncreaseFor(goal: GoalId, currentSteps: number) {
  const tenPercent = currentSteps * 0.1
  // Recovery ramps gently: 250–500 a week. Every other goal: 500–1,000.
  return goal === 'recovery'
    ? Math.min(500, Math.max(250, roundTo(tenPercent, 50)))
    : Math.min(1000, Math.max(500, roundTo(tenPercent, 100)))
}

function targetFor(input: CalculatorInput) {
  switch (input.goal) {
    case 'weight-loss': {
      const perStep = kcalPer1000Steps(input.weightKg, input.heightCm) / 1000
      return input.currentSteps + input.extraKcal / perStep
    }
    case 'keep-weight-off':
      return Math.max(8500, input.currentSteps)
    case 'longevity':
      return input.age >= 60 ? 7000 : 8000
    case 'heart-metabolic':
    case 'mood':
      return 7000
    case 'knee':
      return 6000
    case 'recovery':
      return input.priorSteps
  }
}

export function calculate(input: CalculatorInput): CalculatorResult {
  const current = Math.max(0, input.currentSteps)
  const rawTarget = targetFor({ ...input, currentSteps: current })
  const target = Math.min(maxTarget, roundTo(rawTarget, 100))
  const extraSteps = target - current
  const weeklyIncrease = weeklyIncreaseFor(input.goal, current)

  const ramp: RampWeek[] = []
  if (extraSteps > 0) {
    // Week 1 starts one increase above today, and the last week lands on the target.
    let steps = current
    for (let week = 1; steps < target && week <= 52; week++) {
      steps = Math.min(target, roundTo(steps + weeklyIncrease, 100))
      ramp.push({ week, steps })
    }
  }

  const result: CalculatorResult = {
    target,
    extraSteps,
    extraMinutes: Math.max(0, Math.round(extraSteps / stepsPerMinute)),
    weeklyIncrease,
    ramp,
  }

  if (input.goal === 'weight-loss') {
    result.kcalPer1000Steps = Math.round(kcalPer1000Steps(input.weightKg, input.heightCm))
    result.kgPerWeek = (input.extraKcal * 7) / kcalPerKgFat
    if (rawTarget > maxTarget) {
      result.warning =
        'That calorie burn would take more than 20,000 steps a day. Pick a smaller daily burn and let what you eat do more of the work.'
    }
  }

  if (input.goal === 'knee' && current < 3000) {
    result.warning = 'Start by getting to a steady 3,000 steps a day, then keep building toward 6,000.'
  }

  return result
}

export const calculatorFaq = [
  {
    question: 'How many steps a day do I need to lose weight?',
    answer:
      'It depends on your weight and how many extra calories you want walking to burn. Each 1,000 steps burns roughly 20–45 calories above rest for most adults, more if you weigh more or are taller. Burning an extra 250 calories a day usually takes 6,000–12,000 steps on top of what you already walk, which is why most weight loss comes from eating less, with walking helping to hold it off.',
  },
  {
    question: 'Is 10,000 steps a day necessary?',
    answer:
      'No. The figure comes from the name of a 1965 Japanese pedometer, not a study. For lower risk of dying early, benefits level off around 6,000–8,000 steps a day for adults 60 and over and 8,000–10,000 for younger adults. Around 7,000 steps a day is linked to lower risk of heart disease, type 2 diabetes, dementia, and depression.',
  },
  {
    question: 'How fast should I increase my step goal?',
    answer:
      'Add about 500–1,000 steps a day each week, roughly 10% of your current average, and hold each level for a week before raising it. When recovering from surgery, an injury, or illness, use smaller increases of 250–500 a week and follow the limits your care team gives you.',
  },
  {
    question: 'How many steps a day after surgery?',
    answer:
      'There is no single number. A sensible aim is to rebuild to your usual daily steps from before the operation, in small weekly increases, within whatever limits your surgeon or physiotherapist sets. Getting up and walking early after surgery is linked to fewer complications.',
  },
  {
    question: 'How many minutes of walking is 1,000 steps?',
    answer: 'About 10 minutes of brisk walking. Brisk means around 100 steps a minute, the pace research uses as the threshold for moderate intensity.',
  },
] as const

const fmt = (value: number) => new Intl.NumberFormat('en-US').format(Math.round(value))

/**
 * The working behind a result, one line per step, in the same numbers the
 * calculator used. Shown under the result so the target is never a black box.
 */
export function explain(input: CalculatorInput, result: CalculatorResult): string[] {
  const current = Math.max(0, input.currentSteps)
  const lines: string[] = []

  switch (input.goal) {
    case 'weight-loss': {
      const per1000 = kcalPer1000Steps(input.weightKg, input.heightCm)
      const extra = result.target - current
      lines.push(
        `Walking burns about ${fmt(per1000)} kcal per 1,000 steps at your weight and height (half a calorie per kg of body weight per km, with your stride estimated from your height).`,
        `${fmt(input.extraKcal)} kcal ÷ ${fmt(per1000)} kcal per 1,000 steps ≈ ${fmt(extra)} extra steps.`,
        `${fmt(current)} steps today + ${fmt(extra)} extra = ${fmt(result.target)} steps a day.`
      )
      break
    }
    case 'keep-weight-off':
      lines.push(
        'Around 8,500 steps a day is the level linked to keeping weight off longest.',
        current > 8500
          ? `You already average ${fmt(current)}, which is higher, so your goal is to keep that.`
          : `You average ${fmt(current)}, so your goal is 8,500.`
      )
      break
    case 'longevity':
      lines.push(
        input.age >= 60
          ? `At ${fmt(input.age)}, the benefit levels off between 6,000 and 8,000 steps a day.`
          : `At ${fmt(input.age)}, the benefit levels off between 8,000 and 10,000 steps a day.`,
        input.age >= 60
          ? 'Your goal is 7,000, the middle of that range.'
          : 'Your goal is 8,000, the start of that range. Going higher still helps, by less.'
      )
      break
    case 'heart-metabolic':
      lines.push(
        'Around 7,000 steps a day is linked to lower risk of heart disease and type 2 diabetes.',
        'Your goal is 7,000. A 10-minute walk after your biggest meal adds about 1,000 of them.'
      )
      break
    case 'mood':
      lines.push('7,000 steps a day is linked to about 31% lower risk of depression than walking less.', 'Your goal is 7,000.')
      break
    case 'knee':
      lines.push('Walking under 6,000 steps a day best predicted who went on to struggle with daily activities.', 'Your goal is 6,000.')
      break
    case 'recovery':
      lines.push(`Your goal is to get back to your usual ${fmt(input.priorSteps)} steps a day from before the setback.`)
      break
  }

  if (result.ramp.length > 0) {
    lines.push(
      `Build-up: 10% of your ${fmt(current)} steps, kept between ${input.goal === 'recovery' ? '250 and 500' : '500 and 1,000'}, is ${fmt(result.weeklyIncrease)} more steps a day each week, so ${result.ramp.length} ${result.ramp.length === 1 ? 'week' : 'weeks'} to reach ${fmt(result.target)}.`
    )
  }

  return lines
}

export type BuildUpPlan = {
  /** Weeks at the recommended pace; zero when already at the goal. */
  recommendedWeeks: number
  /** Most weeks the plan slider offers. */
  weeksMax: number
  /** Weeks actually used: the chosen number, or the recommended one. */
  weeks: number
  /** Steps a day to add at the start of each week, rounded up to 50. */
  perWeek: number
  /** Faster than the top of the recommended weekly increase for this goal. */
  tooFast: boolean
}

/** The build-up plan for a result, at the recommended pace or over a chosen number of weeks. */
export function buildUpPlan(goal: GoalId, result: CalculatorResult, chosenWeeks?: number | null): BuildUpPlan {
  const recommendedWeeks = result.ramp.length
  const weeksMax = Math.min(52, Math.max(12, recommendedWeeks * 2))
  const weeks = recommendedWeeks > 0 ? Math.min(weeksMax, Math.max(1, Math.round(chosenWeeks ?? recommendedWeeks))) : 0
  const perWeek = weeks > 0 ? Math.ceil(result.extraSteps / weeks / 50) * 50 : 0
  const tooFast = perWeek > (goal === 'recovery' ? 500 : 1000)
  return { recommendedWeeks, weeksMax, weeks, perWeek, tooFast }
}
