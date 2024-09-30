import { RestService } from "./core/RestService";

export class ScheduleService extends RestService<any> {

    getDoctorSchedule(branchId: any, department: any, speciality: any, isPrimary: any, request: any) {
        return this.post(`getDoctorSchedule/${branchId}/${department}/${speciality}/${isPrimary}`, request);
    }

}
const scheduleService = new ScheduleService('schedule');
export default scheduleService;