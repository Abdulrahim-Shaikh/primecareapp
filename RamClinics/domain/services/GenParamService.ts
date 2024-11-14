import { RestService } from "./core/RestService";

export class GenParamService extends RestService<any> {

    byName(name: any) {
        return this.get("byName/" + name);
    }
}
const genParamService = new GenParamService('genparam');
export default genParamService;