import { RestService } from "./core/RestService";

export class PatientPolicyService extends RestService<any> {

    byPatientId(patientId: any) {
        return this.get(`byPatientId/${patientId}`);
    }

}
const patientPolicyService = new PatientPolicyService('patientpolicy');
export default patientPolicyService;