import { useMemo } from 'react'
import { usePatientStore } from '../stores/patientStore'

export function AnalyticsPage() {
  const patients = usePatientStore((state) => state.patients)

  const stats = useMemo(() => {
    const conditionMap = new Map<string, number>()
    patients.forEach((patient) => {
      conditionMap.set(patient.condition, (conditionMap.get(patient.condition) ?? 0) + 1)
    })
    return Array.from(conditionMap.entries())
  }, [patients])

  return (
    <section>
      <h2 className="text-2xl font-semibold text-slate-900">Analytics</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <article className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-lg font-medium text-slate-800">Condition distribution</h3>
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            {stats.map(([condition, count]) => (
              <li key={condition}>
                {condition}: <strong>{count}</strong>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-lg font-medium text-slate-800">Patient age range</h3>
          <p className="mt-2 text-slate-700">
            {Math.min(...patients.map((p) => p.age))}–{Math.max(...patients.map((p) => p.age))} years
          </p>
        </article>
      </div>
    </section>
  )
}
