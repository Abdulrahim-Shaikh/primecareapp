import { RestService } from "./core/RestService";

export class AppointmentService extends RestService<any> {

    appointmentHistoryByPatient(patientId: any, status: any) {
        return this.get("patientAppHistory/" + patientId + "/" + status);
    }

    getAppointments(patientId: any, branchId: any) {
        return this.get(`getAppointments/${patientId}/${branchId}`);
    }

    getAppointmentsBySlotId(slots: any[], branchId: string, apptDate: string, practitionerId: string,){
        return this.post(`getAppointmentsBySlotId?branchId=${branchId}&apptDate=${apptDate}&practitionerId=${practitionerId}`, slots);
    }
}

const appointmentService = new AppointmentService('appointment');
export default appointmentService;