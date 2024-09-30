import { RestService } from "./core/RestService";

export class DoctorService extends RestService<any> {

    getAllDoctorsByBranch(branchId: any) {
        return this.get("getAllDoctorsByBranch/" + branchId);
    }

}
const doctorService = new DoctorService('resource');
export default doctorService;