import { create } from "zustand"

interface HISState {
  branches: any[],
  currentBranch: any
}


export const useHISSate = create<HISState>()((set) => ({
    currentBranch: null,
    branches: [],
    setCurrentBranch: (branch: any) => set((state) => ({ currentBranch: branch })),
    setBranches: (branches: any[]) => set((state) => ({ branches: branches })),
}))