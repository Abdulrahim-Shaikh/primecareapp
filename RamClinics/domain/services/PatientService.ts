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

}
const patientService = new PatientService('patient');
export default patientService;