import axios from 'axios';

class HttpService {

    private userId: string = '';
    private username: string = '';
    private token: string = '';
    private companyCode = 'TECHNAS';
    private divisionCode = 'CHN';
    private headers = new Map();
    private allowedDivisions: Array<string> = ['CHN'];

    private baseUrl = "http://16.24.11.104:8080/HISAdmin/api/" ;//

    getAPI(path: string) {
        return axios.get(this.baseUrl + path);
    }

    postAPI(path: string, entity: any) {
        return axios.post(path, entity);
    }

    putAPI(path: string, entity: any) {
        return axios.put(path, entity);
    }

    deleteAPI(path: string, id: number) {
        return axios.delete(path + id);
    }
}

const http = new HttpService();
export default http;