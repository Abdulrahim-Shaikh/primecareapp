import { RestService } from "./core/RestService";

export class BranchService extends RestService<any> {

    getBranchByName(name: any) {
        return this.get("byBranchId/" + name);
    }

    getAllBranchesInCity(city: any) {
        let branchesResponse: any = this.get("filterByCity/" + city);
        let filteredBranches = branchesResponse.filter((branch: any) => branch.showInMobileApp === true)
        return filteredBranches;
    }

    getAllActiveBranchNames(){
        return this.get("getAllActiveBranchNames")
    }

    cityByDept(dept: any){
        return this.get(`cityByDepartment/${dept}`)
    }

    branchesByCityAndDept(city: any, dept: any){
        let branchesResponse: any = this.get(`branchesByCityAndDept/${city}/${dept}`)
        let filteredBranches = branchesResponse.filter((branch: any) => branch.showInMobileApp === true)
        return filteredBranches;
    }
}
const branchService = new BranchService('hisbranch');
export default branchService;