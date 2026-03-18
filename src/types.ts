export type Patient = {
  id: string
  name: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  condition: string
  lastVisit: string
  room: string
  notes: string
}
