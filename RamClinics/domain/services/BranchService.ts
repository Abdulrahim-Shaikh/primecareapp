import { RestService } from "./core/RestService";

export class BranchService extends RestService<any> {

    getBranchByName(name: any) {
        return this.get("byBranchId/" + name);
    }

    getAllBranchesInCity(city: any) {
        return this.get("filterByCity/" + city);
    }

    getAllActiveBranchNames(){
        return this.get("getAllActiveBranchNames")
    }
}
const branchService = new BranchService('hisbranch');
export default branchService;