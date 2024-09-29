import { RestService } from "./core/RestService";

export class ResourceService extends RestService<any> {

    getResourceBySpeciality(id: any, department: any, speciality: any) {
        return this.get(`getResourceBySpeciality/${id}/${department}/${speciality}`);
    }

}
const resourceService = new ResourceService('resource');
export default resourceService;