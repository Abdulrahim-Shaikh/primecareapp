import { RestService } from "./core/RestService";

export class PromotionOrderService extends RestService<any> {

    getByQRCode(id: any) {
        return this.get(`qrCode/${id}`);
    }

    byPatientId(patientId: any) {
        return this.get(`byPatientId/${patientId}`);
    }
}
const promotionOrderService = new PromotionOrderService('promotionorder');
export default promotionOrderService;