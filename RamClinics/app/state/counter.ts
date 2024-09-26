import { create } from 'zustand'

interface CountState {
  count: number
  users: any[]
  increase: (by: number) => void
  decrease: (by: number) => void

  setUsers: (by: any[]) => void
}

export const useCountStore = create<CountState>()((set) => ({
  count: 0,
  users: [],
  increase: (by) => set((state) => ({ count: state.count + by })),
  decrease: (by) => set((state) => ({ count: state.count - by })),
  setUsers: (data: any[]) => set((state) => ({ users: data })),
}))
