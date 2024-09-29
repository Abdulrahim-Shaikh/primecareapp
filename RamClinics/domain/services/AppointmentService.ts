import { RestService } from "./core/RestService";

export class AppointmentService extends RestService<any> {}

const appointmentService = new AppointmentService('appointment');
export default appointmentService;