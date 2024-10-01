import { RestService } from "./core/RestService";

export class DoctorService extends RestService<any> {

    getAllDoctorsByBranch(branchId: any) {
        return this.get("getAllDoctorsByBranch/" + branchId);
    }

    getAllDoctors() {
        return this.get("getAllDoctors/");
    }

}
const doctorService = new DoctorService('resource');
export default doctorService;