import { RestService } from "./core/RestService";

export class PackageService extends RestService<any> {

}
const packageService = new PackageService('servicepackage');
export default packageService;