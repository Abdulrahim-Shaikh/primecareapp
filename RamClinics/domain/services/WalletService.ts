import { RestService } from "./core/RestService";

export class WalletService extends RestService<any> {

    getBalance(patientId: any) {
        return this.get ("getBalance/" + patientId);
    }
}
const specialityService = new WalletService('wallettxn');
export default specialityService;