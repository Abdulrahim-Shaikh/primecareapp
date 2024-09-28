import { RestService } from "./core/RestService";

export class InvoiceService extends RestService<any> {

}
const invoiceService = new InvoiceService('invoice');
export default invoiceService;