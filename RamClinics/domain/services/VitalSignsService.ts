import { RestService } from "./core/RestService";

export class VitalSignsService extends RestService<any>{

    vitalSignsByPatientId(patientId: any) {
        return this.get("patientEncounterHistory/" + patientId);
    }

    patientEncounterHistory(patientId: any) {
        return this.get("patientEncounterHistory/" + patientId);
    }
}

const vitalSignsService = new VitalSignsService('encounter');

export default vitalSignsService;
