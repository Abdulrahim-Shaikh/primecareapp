import { create } from "zustand"

interface HISState {
  branches: any[],
  currentBranch: any,
  setBranches: (branches: any[]) => void;
  setCurrentBranch: (branch: any) => void;
}


export const useHISSate = create<HISState>()((set) => ({
    currentBranch: null,
    branches: [],
    setCurrentBranch: (branch: any) => set((state) => ({ currentBranch: branch })),
    setBranches: (branches: any[]) => set((state) => ({ branches: branches })),
}))