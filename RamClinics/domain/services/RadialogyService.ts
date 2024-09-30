import { RestService } from "./core/RestService";

export class RadialogyService extends RestService<any> {

    byPatientId(patientId: any) {
        return this.get("byPatientId/" + patientId);
    }

}
const radialogyService = new RadialogyService('risorder');
export default radialogyService;