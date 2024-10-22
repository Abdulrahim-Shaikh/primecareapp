import { RestService } from "./core/RestService";

export class WalletService extends RestService<any> {

    // getBalance(patientId: any) {
    //     return this.get ("getBalance/" + patientId); //wallettxn entity
    // }

    getAccountsByPatientId(patientId : any,branchId : any) {
        return this.get(`getAccountsByPatientId/${patientId}/${branchId}`);
    }

    refillWallet(accountNo : string, type : string, amount : number, branchId : any, doctorId : any, patientId : any) {
        return this.put(`refillWallet/${accountNo}/${type}/${amount}/${branchId}/${doctorId}/${patientId}`,{});
    }

    transferToDoctorWallet(accountNo : string, amount : number, branchId : any, doctorId : any, patientId : any) {
        return this.put(`transferToDoctorWallet/${accountNo}/${amount}/${branchId}/${doctorId}/${patientId}`,{});
    }
}
const specialityService = new WalletService('account');
export default specialityService;