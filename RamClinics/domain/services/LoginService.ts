import { RestService } from "./core/RestService";

export class LoginService extends RestService<any> {

    generateOtp(mobileNo: any) {
        mobileNo = this.formateMobileNo(mobileNo);
        return this.get("generateAndSendOtp/" + mobileNo);
    }

    byMobileNo(mobileNo: any) {
        mobileNo = this.formateMobileNo(mobileNo);
        return this.get("byMobileNo/" + mobileNo);
    }


    formateMobileNo(mobileNo: string) {
        if (mobileNo.startsWith("0")) {
            mobileNo = mobileNo.substring(1);
        }
        if (mobileNo.startsWith("966")) {
            mobileNo = mobileNo.substring(3);
        }
        if (mobileNo.startsWith("+966")) {
            mobileNo = mobileNo.substring(4);
        }
        return mobileNo;
    }
}
const loginService = new LoginService('signupform');
export default loginService;