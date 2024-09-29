import { RestService } from "./core/RestService";

export class InvoiceService extends RestService<any> {

    invoicesByPatientId(patientId: any) {
        return this.get("invoicesByPatientId/" + patientId);
    }

}
const invoiceService = new InvoiceService('invoice');
export default invoiceService;