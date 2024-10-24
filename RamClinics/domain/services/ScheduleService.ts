import { RestService } from "./core/RestService";

export class ScheduleService extends RestService<any> {

    getDoctorScheduleByDate(branchId: any, practitionerId: any, date: any) {
        return this.get(`getDoctorScheduleByDate/${branchId}/${practitionerId}/${date}`);
    }

    getDoctorSchedule(branchId: any, department: any, speciality: any, isPrimary: any, request: any) {
        return this.post(`getDoctorSchedule/${branchId}/${department}/${speciality}/${isPrimary}`, request);
    }

}
const scheduleService = new ScheduleService('schedule');
export default scheduleService;