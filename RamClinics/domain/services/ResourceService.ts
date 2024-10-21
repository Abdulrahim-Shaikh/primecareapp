import { RestService } from "./core/RestService";

export class ResourceService extends RestService<any> {

    getResourceBySpeciality(id: any, department: any, speciality: any) {
        return this.get(`getResourceBySpeciality/${id}/${department}/${speciality}`);
    }

    getCityBySpeciality(specialityCode: any, deviceCode: any) {
        return this.get(`getCityBySpeciality?specialityCode=${specialityCode}&deviceCode=${deviceCode}`);
    }

    getBranchBySpecialityCity(specialityCode: any, city: any, deviceCode: any) {
        return this.get(`getBranchBySpecialityCity?specialityCode=${specialityCode}&city=${city}&deviceCode=${deviceCode}`);
    }

    getResourceByLiveSlotSpeciality(specialityCode: any, date: any, branch: any, shiftType: any, city: any, deviceCode: any, responsible: any) {
        return this.get(`getResourceByLiveSlotSpeciality?specialityCode=${specialityCode}&date=${date}&branch=${branch}&shiftType=${shiftType}&city=${city}&deviceCode=${deviceCode}&responsible=${responsible}`);
    }

    getAllDoctorsByDesignation(designation: string) {
        return this.get(`getAllDoctorsByDesignation/${designation}`);
    }

}
const resourceService = new ResourceService('resource');
export default resourceService;