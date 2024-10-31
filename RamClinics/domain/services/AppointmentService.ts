import { RestService } from "./core/RestService";

export class AppointmentService extends RestService<any> {

    appointmentHistoryByPatient(patientId: any, status: any) {
        return this.get("patientAppHistory/" + patientId + "/" + status);
    }

    getAppointments(patientId: any, branchId: any) {
        return this.get(`getAppointments/${patientId}/${branchId}`);
    }

    getLastThreeAppointments(patientId: any) {
        return this.get(`getLastThreeAppointments/${patientId}`);
    }

    getAppointmentsBySlotId(slots: any[], branchId: string, apptDate: string, practitionerId: string,){
        return this.post(`getAppointmentsBySlotId?branchId=${branchId}&apptDate=${apptDate}&practitionerId=${practitionerId}`, slots);
    }

    bookAppointmentBySource(appointment: any) {
        // console.log("\n\n\n\n\n\n\n\nappointment: ", JSON.stringify(appointment, null, 2));
        // let app2 = {"mrno":"TEC00PNT990406","patientId":"PNT990406","patientName":"S Sameer Rehman","gender":"Male","age":null,"mobileNo":"951507876","nationality":"Saudi Arabia","department":"Dental","speciality":"Prosthodontics","appointmentDate":"2024-10-28T11:15:47","branchName":"TECHNAS","branchId":3269213,"policyNo":"C0001","policyName":"Cash Plan","createdBy":"abd","visitType":"Checkup","status":"pending","hisStatus":"Booked","slots":[{"slotId":40967941,"scheduleId":7084595,"status":"busy","slotName":"11:50-11:55","startTime":"2024-10-28T11:50:00","endTime":"2024-10-28T11:55:00"},{"slotId":40967942,"scheduleId":7084595,"status":"busy","slotName":"11:55-12:00","startTime":"2024-10-28T11:55:00","endTime":"2024-10-28T12:00:00"}],"nationalId":"1234567885","practitionerName":"Dental Doctor","practitionerId":3269215,"shift":null,"walkIn":null,"requestByPatient":null,"remarks":null,"history":[{"status":"Booked","updatedBy":"abd","updatedDate":"2024-10-28T08:16:28.462Z"}],"startTime":"2024-10-28T11:50:00","endTime":"2024-10-28T12:00:00","className":null,"cardNo":"0","createdDate":"2024-10-28T11:16:28"}
        // console.log("appointment: ", JSON.stringify(app2, null, 2), "\n\n\n\n\n\n\n");
        return this.post(`bookAppointmentBySourceMobileApp/CallCenter/NewFlow`, appointment);
    }

    appointmentsByDate(branchId: any, fromDate: any, toDate: any, patientId: any, mrno: any, status: any) {
        return this.get(`appointmentsByDate/${branchId}/${fromDate}/${toDate}/${patientId}/${mrno}/${status}`);
    }

}

const appointmentService = new AppointmentService('appointment');
export default appointmentService;