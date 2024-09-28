import { create } from 'zustand';

interface UserState {
  userName: string,
  userId: string,
  user: any,
  resource: any,
  setUser: (userInfo: any) => void;
  setResource: (userInfo: any) => void;
}

export const useUserSate = create<UserState>()((set) => ({
    userName : '',
    userId: '',
    user: {},
    resource: {},
    setUser: (userInfo) => set((state) => ({ user: state.user = userInfo, userId: userInfo.id, userName: userInfo.userName })),
    setResource: (resourceInfo) => set((state) => ({ user: state.resource = resourceInfo })),
}));