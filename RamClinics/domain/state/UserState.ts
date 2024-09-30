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


// {
//   "active": true,
//   "adminPages": null,
//   "allowedDivisions": ["CHN"],
//   "branch": "Technas",
//   "branchCode": "Technas",
//   "city": null,
//   "clientId": null,
//   "clientPages": null,
//   "clientPrivilege": null,
//   "comPort": null,
//   "companyCode": "TECHNAS",
//   "country": "India",
//   "department": null,
//   "designation": null,
//   "divisionCode": "CHN",
//   "email": null,
//   "firstName": "Abdulrahman",
//   "id": "PNT100505",
//   "lastName": "Syed",
//   "menuAccess": null,
//   "mobile": "503046250",
//   "permissions": null,
//   "posIP": null,
//   "posPort": null,
//   "profileImg": [""],
//   "roles": null,
//   "speciality": null,
//   }