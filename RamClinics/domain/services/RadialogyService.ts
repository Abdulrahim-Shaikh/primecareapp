import { RestService } from "./core/RestService";

export class RadialogyService extends RestService<any> {

    byPatientId(patientId: any) {
        return this.get("byPatientId/" + patientId);
    }

    byPatientIds(patientId: any) {
        return this.getQuery("byPatientId/" + patientId);
    }


}
const radialogyService = new RadialogyService('risorder');
export default radialogyService;