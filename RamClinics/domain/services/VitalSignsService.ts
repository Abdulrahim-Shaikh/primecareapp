import { RestService } from "./core/RestService";

export class VitalSignsService extends RestService<any>{

    vitalSignsByPatientId(patientId: any) {
        return this.get("patientEncounterHistory/" + patientId);
    }
}

const vitalSigns = new VitalSignsService('encounter');

export default vitalSigns;
