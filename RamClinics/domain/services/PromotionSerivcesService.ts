import { RestService } from "./core/RestService";

export class PromotionServicesService extends RestService<any> {

    getAllServices() {
        return this.get("getAllServices");
    }

}
const promotionServicesService = new PromotionServicesService('promotionservicetable');
export default promotionServicesService;