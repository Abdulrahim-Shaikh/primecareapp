import axios from 'axios';
import { UAT_LINK } from '@env';
import {
    useQuery
} from "@tanstack/react-query";
class HttpService {

    private userId: string = '';
    private username: string = '';
    private token: string = '';
    private companyCode = 'TECHNAS';
    private divisionCode = 'CHN';    
    private allowedDivisions = 'CHN'//Array<string> = ['CHN'];

    // private baseUrl = PROD_LINK;
    private baseUrl = UAT_LINK;

    getHeaders() {
        return {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.token,
                User: '' + this.userId,
                Username: '' + this.username,
                Company: '' + this.companyCode,
                Division: '' + this.divisionCode,
                AllowedDivisions: this.allowedDivisions,                
            }
        }
    }

    getAPI(path: string) {
        console.log(path);
        return axios.get(this.baseUrl + path, this.getHeaders());
    }

    getAPIQuery(path: string,options: any) {
        console.log(path);
        return useQuery({queryKey: [path], queryFn:  async () => (await this.getAPI(path)).data,...options});
    }

    postAPI(path: string, entity: any) {
        return axios.post(this.baseUrl + path, entity, this.getHeaders());
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
        return axios.put(this.baseUrl + path, entity, this.getHeaders());
    }

    deleteAPI(path: string, id: number) {
        return axios.delete(this.baseUrl + path + id, this.getHeaders());
    }
}

const http = new HttpService();
export default http;