import { RestService } from "./core/RestService";

export class SpecialityService extends RestService<any> {

    getByDept(department: any) {
        return this.get(`getByDept/${department}`);
    }

    getSpecialityServiceByDepartmentTest(department: any) {
        return this.get(`getSpecialityServiceByDepartmentTest?department=${department}`);
    }
}
const specialityService = new SpecialityService('speciality');
export default specialityService;