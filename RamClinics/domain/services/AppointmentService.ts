import { RestService } from "./core/RestService";

export class AppointmentService extends RestService<any> {

    appointmentHistoryByPatient(patientId: any, status: any) {
        return this.get("patientAppHistory/" + patientId + "/" + status);
    }

}

const appointmentService = new AppointmentService('appointment');
export default appointmentService;