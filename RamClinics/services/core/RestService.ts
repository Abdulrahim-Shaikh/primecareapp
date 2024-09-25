
import { HttpService } from './HttpService';

// @Injectable({providedIn : 'root'})
export class RestService<T> {

  constructor(public http: HttpService, public entityName: string) {
  }

  save(entity: T) {
    return this.http.postAPI(this.entityName, entity);
  }

  find(id: number) {
    return this.http.getAPI(this.entityName + '/' + id);
  }

  findById(id: number) {
    return this.http.getAPI(this.entityName + '/find/' + id);
  }

  findAll() {
    return this.http.getAPI(this.entityName);
  }

  update(entity: T) {
    return this.http.putAPI(this.entityName, entity);
  }

  delete(id: number) {
    return this.http.deleteAPI(this.entityName, id);
  }

  get(path: string) {
    return this.http.getAPI(this.entityName + '/' + path);
  }

  put(path: string, entity: any) {
    return this.http.putAPI(this.entityName + '/' + path, entity);
  }

  post(path: string, entity: any) {
    return this.http.postAPI(this.entityName + '/' + path, entity);
  }
}
