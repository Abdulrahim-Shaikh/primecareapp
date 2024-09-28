import { RestService } from "./core/RestService";

export class CityMasterService extends RestService<any> {

}
const cityMasterService = new CityMasterService('citymaster');
export default cityMasterService;