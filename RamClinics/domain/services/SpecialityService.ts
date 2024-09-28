import { RestService } from "./core/RestService";

export class SpecialityService extends RestService<any> {

    getSpecialityServiceByDepartmentTest(department: any) {
        return this.get(this.entityName + "/getSpecialityServiceByDepartmentTest?department=" + department);
    }
}
const specialityService = new SpecialityService('speciality');
export default specialityService;