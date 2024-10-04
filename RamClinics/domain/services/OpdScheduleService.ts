import { RestService } from "./core/RestService";

export class OpdScheduleService extends RestService<any> {

    getDepartments(branchName: any) {
        return this.get(`getDepartments/${branchName}`);
    }

    getAllDepartments(branchName: any) {
        return this.get(`getAllDepartments`);
    }

}
const opdScheduleService = new OpdScheduleService('opdschedule');
export default opdScheduleService;