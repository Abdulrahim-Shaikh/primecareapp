import axios from 'axios';
import { UAT_LINK } from '@env';
import {PROD_LINK} from '@env'
import {CLAIMS_LINK} from '@env'
import {
    useQuery
} from "@tanstack/react-query";
class HttpService {

    private readonly userId: string = '';
    private readonly username: string = '';
    private readonly token: string = '';
    // need to put the company code and division code in the environment variables
    private readonly companyCode = 'TECHNAS';
    private readonly divisionCode = 'CHN';    
    private readonly allowedDivisions = 'CHN'//Array<string> = ['CHN'];
    // private readonly baseUrl = CLAIMS_LINK;
    // private readonly baseUrl = PROD_LINK;
    private readonly baseUrl = UAT_LINK;

    getURL() {
        return this.baseUrl;
    }


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
        console.log("---------- GET: " + path);
        return axios.get(this.baseUrl + path, this.getHeaders());
    }

    getAPIQuery(path: string,options: any) {
        return useQuery({queryKey: [path], queryFn:  async () => (await this.getAPI(path)).data,...options});
    }

    postAPI(path: string, entity: any) {
        console.log("---------- POST: " + path);
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
        console.log("---------- PUT: " + path);
        return axios.put(this.baseUrl + path, entity, this.getHeaders());
    }

    deleteAPI(path: string, id: number) {
        console.log("---------- DELETE: " + path);
        return axios.delete(this.baseUrl + path + id, this.getHeaders());
    }
}

const http = new HttpService();
export default http;