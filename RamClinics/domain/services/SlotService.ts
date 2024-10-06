import { RestService } from "./core/RestService";

export class SlotService extends RestService<any> {

    slotsByIds(slotIds: string) {
        return this.get(`slotsByIds?slotsIds=${slotIds}`);
    }
}

const slotService = new SlotService('slot');
export default slotService;