import type { Patient } from '../types'
import { Link } from 'react-router-dom'

export function PatientCard({ patient }: { patient: Patient }) {
  return (
    <article className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <h3 className="text-lg font-semibold text-slate-900">{patient.name}</h3>
      <p className="text-sm text-slate-600">{patient.condition}</p>
      <p className="mt-2 text-sm text-slate-700">Age: {patient.age}</p>
      <p className="text-sm text-slate-700">Room: {patient.room}</p>
      <Link
        to={`/patients/${patient.id}`}
        className="mt-3 inline-block rounded-md border border-indigo-200 bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
      >
        View details
      </Link>
    </article>
  )
}
