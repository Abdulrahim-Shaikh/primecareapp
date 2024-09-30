import { RestService } from "./core/RestService";

export class InvoiceService extends RestService<any> {

    invoicesByPatientId(patientId: any) {
        return this.get("invoicesByPatientId/" + patientId);
    }

    invoiceApprovals(branchId: any, mrno: any, fromdate: any, todate:any) {
        console.log("here: ", branchId, fromdate, todate, mrno)
        return this.get(`invoiceApprovals?branchId=${branchId}&fromdate=${fromdate}&toDate=${todate}&mrnNo=${mrno}/`);
        // return this.get("invoiceApprovals?branchId="+  branchId + "&fromDate=" + fromdate + "&toDate=" + fromdate + "&mrnNo=" + mrno);
    }
}
const invoiceService = new InvoiceService('invoice');
export default invoiceService;