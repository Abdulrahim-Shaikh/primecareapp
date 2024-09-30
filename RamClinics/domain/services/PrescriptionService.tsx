import { RestService } from "./core/RestService";

export class PrescriptionService extends RestService<any> {

    byPatientId(patientId: any) {
        return this.get("byPatientId/" + patientId);
    }

}
const prescriptionService = new PrescriptionService('pharmacyorder');
export default prescriptionService;