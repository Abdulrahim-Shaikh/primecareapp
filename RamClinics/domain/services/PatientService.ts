import { RestService } from "./core/RestService";

export class PatientService extends RestService<any> {

    getByMobileNo(mobileNo: any) {
        return this.get("byMobileNo/" + mobileNo);
    }
    getByPatientId(patientId: any) {
        return this.get("getByPatientId" + patientId);
    }
    getFamilyFile(familyFile: any) {
        return this.get("getFamilyFile/" + familyFile);
    }
    addFamilyMember(familyMember:any){
        return this.get("addFamilyMember/" + familyMember);
    }
    byMobileNo(mobileNo: any) {
        return this.get(`byMobileNo/${mobileNo}`);
    }
    getParentRelation(parentRelation: any) {
        return this.get("getParentRelation/" + parentRelation);
    }
    savePatient(patientDetails: any) {
        return this.save(patientDetails);
    }

}
const patientService = new PatientService('patient');
export default patientService;