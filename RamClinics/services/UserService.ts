import { RestService } from "./core/RestService";

export class UserService extends RestService<any>{

}
const userService = new UserService('user');
export default userService;