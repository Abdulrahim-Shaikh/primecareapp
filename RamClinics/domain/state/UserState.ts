import { create } from 'zustand';

interface UserState {
  userName: string,
  patientName: string,
  userId: string,
  user: any,
  resource: any,
  loggedIn: boolean,
  branch: string,
  setUser: (userInfo: any) => void;
  setLoggedOut: (userInfo: any) => void;
  setResource: (userInfo: any) => void;
}

export const useUserSate = create<UserState>()((set) => ({
    userName : '',
    patientName: '',
    userId: '',
    user: {},
    resource: {},
    loggedIn: false,
    branch: '',
    setUser: (userInfo) => set((state) => ({ user: state.user = userInfo, userId: userInfo.id, userName: userInfo.userName, loggedIn: true, 
      patientName: userInfo.firstName+' '+userInfo.lastName, branch: userInfo.branch })),
    setResource: (resourceInfo) => set((state) => ({ user: state.resource = resourceInfo })),
    setLoggedOut: () => set(() => ({user: null, userName: '', loggedIn: false})),
}));