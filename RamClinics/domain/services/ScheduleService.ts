import { RestService } from "./core/RestService";

export class ScheduleService extends RestService<any> {

    getDoctorSchedule(branchId: any, department: any, speciality: any, isPrimary: any) {
        return this.get(`getDoctorSchedule/${branchId}/${department}/${speciality}/${isPrimary}`);
    }

}
const scheduleService = new ScheduleService('schedule');
export default scheduleService;