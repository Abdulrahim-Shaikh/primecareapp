import { RestService } from "./core/RestService";

export class LeaveRegisterService extends RestService<any> {

    getDoctorLeaveDays(doctorName: string, branchName: string) {
        return this.get(`getDoctorLeaveDays/${doctorName}/${branchName}`);
    }
}

const leaveRegisterService = new LeaveRegisterService('leaveregister');
export default leaveRegisterService;