import { useParams, Link } from 'react-router-dom'
import { usePatientStore } from '../stores/patientStore'

export function PatientDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const patients = usePatientStore((state) => state.patients)
  const patient = patients.find((it) => it.id === id)

  if (!patient) {
    return (
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Patient not found</h2>
        <Link
          className="rounded-md border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
          to="/patients"
        >
          Back to patients
        </Link>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 p-4 text-white shadow-lg ring-1 ring-indigo-300">
        <div>
          <h2 className="text-2xl font-semibold">{patient.name}</h2>
          <p className="text-sm text-indigo-100">Patient detail and care summary.</p>
        </div>
        <Link
          className="inline-flex items-center rounded-md border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
          to="/patients"
        >
          Back to patients
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
          <strong>Age:</strong> {patient.age}
        </div>
        <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
          <strong>Gender:</strong> {patient.gender}
        </div>
        <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
          <strong>Condition:</strong> {patient.condition}
        </div>
        <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
          <strong>Last visit:</strong> {patient.lastVisit}
        </div>
        <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
          <strong>Room:</strong> {patient.room}
        </div>
        <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
          <strong>Notes:</strong> {patient.notes}
        </div>
      </div>
    </section>
  )
}
