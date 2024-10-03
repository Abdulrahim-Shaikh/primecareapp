import axios from 'axios';

class HttpService {

    private userId: string = '';
    private username: string = '';
    private token: string = '';
    private companyCode = 'TECHNAS';
    private divisionCode = 'CHN';    
    private allowedDivisions = 'CHN'//Array<string> = ['CHN'];

  private baseUrl = "http://16.24.11.104:8080/HISAdmin/api/";
//private baseUrl = "https://ramprimecare.com/HISAdmin/api/" ;

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
        return axios.get(this.baseUrl + path, this.getHeaders());
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