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

    bookAppointmentBySource(source: any, flowType: any, appointment: any) {
        return this.post(`bookAppointmentBySource/${source}/${flowType}`, appointment);
    }

    appointmentsByDate(branchId: any, fromDate: any, toDate: any, patientId: any, mrno: any, status: any) {
        return this.get(`appointmentsByDate/${branchId}/${fromDate}/${toDate}/${patientId}/${mrno}/${status}`);
    }

}

const appointmentService = new AppointmentService('appointment');
export default appointmentService;