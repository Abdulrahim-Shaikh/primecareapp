import { RestService } from "./core/RestService";

export class LabratoryService extends RestService<any> {

    byPatientId(patientId: any) {
        return this.get("byPatientId/" + patientId);
    }

}
const labratoryService = new LabratoryService('laborder');
export default labratoryService;
;