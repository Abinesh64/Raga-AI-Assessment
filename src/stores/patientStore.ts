import { create } from 'zustand'
import type { Patient } from '../types'

const samplePatients: Patient[] = [
  { id: 'p1', name: 'Janet Doe', age: 34, gender: 'Female', condition: 'Hypertension', lastVisit: '2026-03-10', room: '302A', notes: 'Needs diet plan' },
  { id: 'p2', name: 'Chirag Patel', age: 58, gender: 'Male', condition: 'Type 2 Diabetes', lastVisit: '2026-03-14', room: '410C', notes: 'Blood sugar trending down' },
  { id: 'p3', name: 'Lisa Gomez', age: 29, gender: 'Female', condition: 'Asthma', lastVisit: '2026-03-08', room: '210B', notes: 'Inhaler compliance high' },
  { id: 'p4', name: 'Aminah Khan', age: 45, gender: 'Female', condition: 'Post-Surgery Recovery', lastVisit: '2026-03-12', room: '115D', notes: 'Mobility improving' },
  { id: 'p5', name: 'Micah Lee', age: 67, gender: 'Other', condition: 'Cardiac Monitoring', lastVisit: '2026-03-11', room: '520E', notes: 'Awaiting ECHO' },
]

interface PatientState {
  patients: Patient[]
  viewMode: 'list' | 'grid'
  selectedPatientId: string | null
  toggleViewMode: () => void
  setSelectedPatientId: (id: string | null) => void
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: samplePatients,
  viewMode: 'grid',
  selectedPatientId: null,
  toggleViewMode: () => set((state) => ({ viewMode: state.viewMode === 'grid' ? 'list' : 'grid' })),
  setSelectedPatientId: (id) => set({ selectedPatientId: id }),
}))
