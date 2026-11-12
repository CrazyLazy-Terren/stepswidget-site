'use client'

import { useEffect, useId, useState, type ReactNode } from 'react'
import { buildUpPlan, calculate, explain, goalById, goals, stepsPerMinute, type GoalId } from './goals'
import { kcalOptions, registerStepGoalTool, type KcalOption } from './webmcp'

type Units = 'metric' | 'imperial'

const nf = new Intl.NumberFormat('en-US')
const kgPerLb = 0.45359237
const cmPerIn = 2.54

function NumberField({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
  sliderMax,
}: {
  label: string
  hint?: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  suffix?: string
  /** Upper end of the slider when the full range would make it too coarse to drag. */
  sliderMax?: number
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-[var(--text-strong)]">
        {label}
      </label>
      {hint && <p className="mt-1 text-sm leading-6 text-[var(--text-subtle)]">{hint}</p>}
      <div className="mt-2 flex items-center rounded-md border border-[color:var(--border-strong)] bg-[var(--control-bg)] focus-within:border-[color:var(--accent-color)]">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : ''}
          onChange={(event) => onChange(event.target.valueAsNumber)}
          className="w-full min-w-0 bg-transparent px-3 py-2.5 text-base tabular-nums text-[var(--text-strong)] outline-none"
        />
        {suffix && <span className="pr-3 text-sm text-[var(--text-subtle)]">{suffix}</span>}
      </div>
      {/* The slider covers the common range; the box above still takes anything up to `max`. */}
      <input
        type="range"
        aria-label={`${label} slider`}
        min={min}
        max={sliderMax ?? max}
        step={step}
        value={Number.isFinite(value) ? Math.min(value, sliderMax ?? max) : min}
        onChange={(event) => onChange(event.target.valueAsNumber)}
        className="mt-3 h-2 w-full cursor-pointer accent-[var(--accent-color)]"
      />
    </div>
  )
}

function Segmented<T extends string | number>({
  label,
  options,
  value,
  onChange,
  format,
}: {
  label: string
  options: readonly T[]
  value: T
  onChange: (value: T) => void
  format: (value: T) => ReactNode
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-[var(--text-strong)]">{label}</legend>
      <div className="mt-2 inline-flex rounded-md border border-[color:var(--border-strong)] bg-[var(--control-bg)] p-1">
        {options.map((option) => (
          <button
            key={String(option)}
            type="button"
            aria-pressed={option === value}
            onClick={() => onChange(option)}
            className={`rounded px-3 py-1.5 text-sm font-medium transition ${
              option === value ? 'bg-[var(--control-active)] text-[var(--control-active-text)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]'
            }`}>
            {format(option)}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

/** Clamp an input that may be NaN mid-edit, so the result never shows nonsense. */
const safe = (value: number, min: number, max: number, fallback: number) => (Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback)

export function StepGoalCalculator() {
  const goalSelectId = useId()
  const [goal, setGoal] = useState<GoalId>('longevity')
  const [units, setUnits] = useState<Units>('metric')
  const [currentSteps, setCurrentSteps] = useState(5000)
  const [age, setAge] = useState(40)
  // Stored in the unit on screen; converted when calculating.
  const [weight, setWeight] = useState(80)
  const [height, setHeight] = useState(172)
  const [extraKcal, setExtraKcal] = useState<KcalOption>(250)
  const [priorSteps, setPriorSteps] = useState(8000)
  // Null follows the recommended pace; a number is the person's own choice.
  const [chosenWeeks, setChosenWeeks] = useState<number | null>(null)
  const weeksSliderId = useId()

  // WebMCP: let an in-browser AI agent run the calculator. The tool's result is also shown on
  // screen, so the person sees the same numbers the agent reads. Setters are stable, so this runs once.
  useEffect(
    () =>
      registerStepGoalTool((input) => {
        setGoal(input.goal)
        setUnits('metric')
        setCurrentSteps(input.currentSteps)
        setAge(input.age)
        setWeight(input.weightKg)
        setHeight(input.heightCm)
        setExtraKcal(input.extraKcal)
        setPriorSteps(input.priorSteps)
        setChosenWeeks(input.weeks)
      }),
    []
  )

  const switchUnits = (next: Units) => {
    if (next === units) return
    if (next === 'imperial') {
      setWeight(Math.round(weight / kgPerLb))
      setHeight(Math.round(height / cmPerIn))
    } else {
      setWeight(Math.round(weight * kgPerLb))
      setHeight(Math.round(height * cmPerIn))
    }
    setUnits(next)
  }

  const weightKg = units === 'metric' ? safe(weight, 30, 300, 80) : safe(weight, 66, 660, 176) * kgPerLb
  const heightCm = units === 'metric' ? safe(height, 120, 230, 172) : safe(height, 48, 90, 68) * cmPerIn
  const current = safe(currentSteps, 0, 40000, 5000)

  const input = {
    goal,
    currentSteps: current,
    age: safe(age, 18, 100, 40),
    weightKg,
    heightCm,
    extraKcal,
    priorSteps: safe(priorSteps, 0, 40000, 8000),
  }
  const result = calculate(input)
  const working = explain(input, result)

  const selected = goalById[goal]
  const alreadyThere = result.extraSteps <= 0
  const { recommendedWeeks, weeksMax, weeks, perWeek, tooFast } = buildUpPlan(goal, result, chosenWeeks)

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* Inputs */}
      <div className="rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] p-6 sm:p-8">
        <label htmlFor={goalSelectId} className="block text-md font-semibold text-[var(--accent-color)]">
          Your goal
        </label>
        <div className="relative mt-4">
          <select
            id={goalSelectId}
            value={goal}
            onChange={(event) => setGoal(event.target.value as GoalId)}
            className="w-full cursor-pointer appearance-none rounded-md border border-[color:var(--border-strong)] bg-[var(--control-bg)] py-3 pl-3 pr-10 text-base font-semibold text-[var(--text-strong)] outline-none focus:border-[color:var(--accent-color)]">
            {goals.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]">
            <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{selected.short}</p>

        {/* <p className="mt-8 text-md font-semibold text-[var(--accent-color)]">About you</p> */}
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <NumberField
              label="Your average daily steps"
              hint="Your typical day over the last week or two. Apple Health shows it under Steps, then W or M."
              value={currentSteps}
              onChange={setCurrentSteps}
              min={0}
              max={40000}
              step={100}
              sliderMax={20000}
              suffix="steps"
            />
          </div>

          {goal === 'longevity' && <NumberField label="Age" value={age} onChange={setAge} min={18} max={100} suffix="years" />}

          {goal === 'recovery' && (
            <div className="sm:col-span-2">
              <NumberField
                label="Your usual daily steps before"
                hint="Before the surgery, injury, or illness. If you are unsure, check a month from before in Apple Health."
                value={priorSteps}
                onChange={setPriorSteps}
                min={0}
                max={40000}
                step={100}
                sliderMax={20000}
                suffix="steps"
              />
            </div>
          )}

          {goal === 'weight-loss' && (
            <>
              <div className="sm:col-span-2">
                <Segmented
                  label="Units"
                  options={['metric', 'imperial'] as const}
                  value={units}
                  onChange={switchUnits}
                  format={(u) => (u === 'metric' ? 'kg · cm' : 'lb · in')}
                />
              </div>
              <NumberField
                label="Weight"
                value={weight}
                onChange={setWeight}
                min={units === 'metric' ? 30 : 66}
                max={units === 'metric' ? 300 : 660}
                suffix={units === 'metric' ? 'kg' : 'lb'}
              />
              <NumberField
                label="Height"
                value={height}
                onChange={setHeight}
                min={units === 'metric' ? 120 : 48}
                max={units === 'metric' ? 230 : 90}
                suffix={units === 'metric' ? 'cm' : 'in'}
              />
              <div className="sm:col-span-2">
                <Segmented
                  label="Extra calories a day from walking"
                  options={kcalOptions}
                  value={extraKcal}
                  onChange={setExtraKcal}
                  format={(kcal) => `${kcal} kcal`}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Result */}
      <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="rounded-lg border border-[color:var(--border)] bg-[var(--surface-2)] p-6 sm:p-8">
          <p className="text-sm font-semibold text-[var(--text-strong)]">Your daily step goal · {selected.label}</p>
          <p className="mt-3 text-6xl font-semibold tracking-[-0.03em] tabular-nums text-[var(--accent-color)] sm:text-7xl">{nf.format(result.target)}</p>
          <p className="mt-1 text-[var(--text-muted)]">steps a day</p>

          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-[color:var(--border)] pt-6">
            <div>
              <dt className="text-sm text-[var(--text-subtle)]">{alreadyThere ? 'Above the goal by' : 'More than today'}</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-[var(--text-strong)]">{nf.format(Math.abs(result.extraSteps))}</dd>
            </div>
            <div>
              <dt className="text-sm text-[var(--text-subtle)]">Extra brisk walking</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-[var(--text-strong)]">{alreadyThere ? 'None' : `≈ ${result.extraMinutes} min`}</dd>
            </div>
            {result.kcalPer1000Steps !== undefined && result.kgPerWeek !== undefined && (
              <>
                <div>
                  <dt className="text-sm text-[var(--text-subtle)]">Burn per 1,000 steps</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums text-[var(--text-strong)]">≈ {result.kcalPer1000Steps} kcal</dd>
                </div>
                <div>
                  <dt className="text-sm text-[var(--text-subtle)]">Adds up to</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums text-[var(--text-strong)]">
                    {units === 'metric' ? `≈ ${result.kgPerWeek.toFixed(2)} kg` : `≈ ${(result.kgPerWeek / kgPerLb).toFixed(1)} lb`}
                    <span className="text-base font-normal text-[var(--text-muted)]"> / week</span>
                  </dd>
                </div>
              </>
            )}
          </dl>

          {result.warning && (
            <p className="mt-6 rounded-md border border-[color:var(--accent-color)] bg-[var(--accent-color-soft)] p-3 text-sm leading-6 text-[var(--text-strong)]">
              {result.warning}
            </p>
          )}

          <p className="mt-6 leading-7 text-[var(--text-muted)]">
            {alreadyThere
              ? 'You already walk this much on a typical day. Hold it, and treat the number as your floor rather than a stretch.'
              : `At brisk walking pace (${stepsPerMinute} steps a minute), that is about ${result.extraMinutes} more minutes on your feet a day. Split it into short walks if that is easier: they count the same.`}
          </p>
        </div>

        {recommendedWeeks > 0 && (
          <div className="rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-[var(--text-strong)]">Your build-up plan</h3>
            <dl className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-[var(--text-subtle)]">Reach your goal in</dt>
                <dd className="mt-1 text-4xl font-semibold tracking-[-0.02em] tabular-nums text-[var(--text-strong)]">
                  {weeks}
                  <span className="text-lg font-normal text-[var(--text-muted)]"> {weeks === 1 ? 'week' : 'weeks'}</span>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--text-subtle)]">Add each week</dt>
                <dd className="mt-1 text-4xl font-semibold tracking-[-0.02em] tabular-nums text-[var(--text-strong)]">
                  +{nf.format(perWeek)}
                  <span className="text-lg font-normal text-[var(--text-muted)]"> steps</span>
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor={weeksSliderId} className="text-sm font-semibold text-[var(--text-strong)]">
                  Adjust the weeks
                </label>
                {chosenWeeks !== null && weeks !== recommendedWeeks && (
                  <button type="button" onClick={() => setChosenWeeks(null)} className="text-sm text-[var(--accent-color)] hover:underline">
                    Reset to {recommendedWeeks} (recommended)
                  </button>
                )}
              </div>
              <input
                id={weeksSliderId}
                type="range"
                min={1}
                max={weeksMax}
                step={1}
                value={weeks}
                onChange={(event) => setChosenWeeks(event.target.valueAsNumber)}
                className="mt-3 h-2 w-full cursor-pointer accent-[var(--accent-color)]"
              />
              <div className="mt-1 flex justify-between text-xs text-[var(--text-subtle)]">
                <span>1 week</span>
                <span>{weeksMax} weeks</span>
              </div>
            </div>

            <p
              className={`mt-5 text-sm leading-6 ${tooFast ? 'rounded-md border border-[color:var(--accent-color)] bg-[var(--accent-color-soft)] p-3 text-[var(--text-strong)]' : 'text-[var(--text-muted)]'}`}>
              {tooFast
                ? `That is faster than the ${goal === 'recovery' ? '250–500' : '500–1,000'} steps a week most people can keep up. ${recommendedWeeks} weeks is the recommended pace.`
                : `Raise your daily goal by ${nf.format(perWeek)} steps at the start of each week, from ${nf.format(current)} today to ${nf.format(result.target)}, and hold each level for the whole week.`}
              {goal === 'recovery' && ' Stay inside any limits your surgeon or physiotherapist has set, and step back a level if pain or swelling increases.'}
            </p>
          </div>
        )}

        <div className="rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-[var(--text-strong)]">How your number is calculated</h3>
          <ol className="mt-4 space-y-3">
            {working.map((line, index) => (
              <li key={line} className="flex gap-3 leading-7 text-[var(--text-main)]">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent-color-soft)] text-xs font-semibold text-[var(--accent-color)]">
                  {index + 1}
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 border-t border-[color:var(--border)] pt-4 text-sm leading-6 text-[var(--text-muted)]">{selected.evidence}</p>
          <ul className="mt-4 space-y-1 text-sm">
            {selected.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer" className="text-[var(--accent-color)] underline-offset-2 hover:underline">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
