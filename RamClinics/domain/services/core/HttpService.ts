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

    //private baseUrl = "https://ramprimecare.com/HISAdmin/api/" ;//

    getAPI(path: string) {
        return axios.get(this.baseUrl + path);
    }

    postAPI(path: string, entity: any) {
        return axios.post(this.baseUrl + path, entity);
        // return axios({
        //     method: 'post',
        //     url: `${path}`,
        //     withCredentials: false,            
        //     data: entity
        //   });

        // const requestOptions = { 
        //     method: 'POST', 
        //     headers: { 'Content-Type': 'application/json' }, 
        //     body: JSON.stringify(entity) 
        // }; 
        // console.log(path);
        // return fetch( this.baseUrl + path, requestOptions);
    }

    putAPI(path: string, entity: any) {
        return axios.put(this.baseUrl +path, entity);
    }

    deleteAPI(path: string, id: number) {
        return axios.delete(this.baseUrl + path + id);
    }
}

const http = new HttpService();
export default http;