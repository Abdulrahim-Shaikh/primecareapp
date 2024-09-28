import { RestService } from "./core/RestService";

export class LoginService extends RestService<any>{

    generateOtp(mobileNo: any) {
        return this.get("generateOtp/" + mobileNo);
    }

    byMobileNo(mobileNo: any) {
        return this.get("byMobileNo/" + mobileNo);
    }
}
const loginService = new LoginService('signupform');
export default loginService;