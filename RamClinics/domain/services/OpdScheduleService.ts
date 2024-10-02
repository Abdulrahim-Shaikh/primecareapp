import { RestService } from "./core/RestService";

export class OpdScheduleService extends RestService<any> {

    getDepartments(branchName: any) {
        return this.get(`getDepartments/${branchName}`);
    }
}
const opdScheduleService = new OpdScheduleService('opdschedule');
export default opdScheduleService;