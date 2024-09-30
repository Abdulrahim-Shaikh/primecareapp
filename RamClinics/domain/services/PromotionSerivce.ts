import { RestService } from "./core/RestService";

export class PromotionService extends RestService<any> {

    getPromotion() {
        return this.get("getPromotion");
    }

}
const promotionService = new PromotionService('promotion');
export default promotionService;