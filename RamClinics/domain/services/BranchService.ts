import { RestService } from "./core/RestService";

export class BranchService extends RestService<any> {

    getBranchByName(name: any) {
        return this.get("byBranchId/" + name);
    }

    filterByCity(city: any) {
        return this.get('hisbranch' + "/getBranchesByCity" + city);
    }

    getAllActiveBranchNames(){
        return this.get(this.entityName+ "/getAllActiveBranchNames")
    }
}
const branchService = new BranchService('hisbranch');
export default branchService;