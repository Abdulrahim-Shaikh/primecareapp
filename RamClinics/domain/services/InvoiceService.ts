import { RestService } from "./core/RestService";

export class InvoiceService extends RestService<any> {

    invoicesByPatientId(patientId: any) {
        return this.get("invoicesByPatientId/" + patientId);
    }

    invoiceApprovals(branchId: any, fromDate: any, toDate:any, mrno: any) {
        console.log(`invoiceApprovals?branchId=${branchId}&fromDate=${fromDate}&toDate=${toDate}&mrnNo=${mrno}/`)
        return this.get(`invoiceApprovals?branchId=${branchId}&fromDate=${fromDate}&toDate=${toDate}&mrnNo=${mrno}`);
        // return this.get("invoiceApprovals?branchId="+  branchId + "&fromDate=" + fromdate + "&toDate=" + fromdate + "&mrnNo=" + mrno);
    }
}
const invoiceService = new InvoiceService('invoice');
export default invoiceService;