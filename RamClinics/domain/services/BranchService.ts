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

    cityByDept(dept: any){
        return this.get(`cityByDepartment/${dept}`)
    }

    branchesByCityAndDept(city: any, dept: any){
        return this.get(`branchesByCityAndDept/${city}/${dept}`)
    }
}
const branchService = new BranchService('hisbranch');
export default branchService;