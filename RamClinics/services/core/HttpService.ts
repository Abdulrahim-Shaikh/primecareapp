import axios from 'axios';

export class HttpService {

    private userId: string = '';
    private username: string = '';
    private token: string = '';
    private companyCode = 'TECHNAS';
    private divisionCode = 'CHN';
    private headers = new Map();
    private allowedDivisions: Array<string> = ['CHN'];

    getAPI(path: string) {
        return axios.get(path);
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