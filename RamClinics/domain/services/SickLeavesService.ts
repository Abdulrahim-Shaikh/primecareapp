import { RestService } from "./core/RestService";

export class SickLeavesService extends RestService<any> {

    byPatientId(patientId: any) {
        return this.get("byPatientId/" + patientId);
    }

}
const sickLeavesService = new SickLeavesService('patientconsentform');
export default sickLeavesService;