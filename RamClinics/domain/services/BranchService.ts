import { RestService } from "./core/RestService";

export class BranchService extends RestService<any> {

    getBranchByName(name: any) {
        return this.get(this.entityName + "/byBranchId/" + name);
    }
}
const branchService = new BranchService('hisbranch');
export default branchService;