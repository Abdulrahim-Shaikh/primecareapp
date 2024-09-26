
import http from './HttpService';

// @Injectable({providedIn : 'root'})
export class RestService<T> {

  constructor(public entityName: string) {
  }

  save(entity: T) {
    return http.postAPI(this.entityName, entity);
  }

  find(id: number) {
    return http.getAPI(this.entityName + '/' + id);
  }

  findById(id: number) {
    return http.getAPI(this.entityName + '/find/' + id);
  }

  findAll() {
    console.log('>>>>> ' + this.entityName)
    return http.getAPI(this.entityName);
  }

  update(entity: T) {
    return http.putAPI(this.entityName, entity);
  }

  delete(id: number) {
    return http.deleteAPI(this.entityName, id);
  }

  get(path: string) {
    return http.getAPI(this.entityName + '/' + path);
  }

  put(path: string, entity: any) {
    return http.putAPI(this.entityName + '/' + path, entity);
  }

  post(path: string, entity: any) {
    return http.postAPI(this.entityName + '/' + path, entity);
  }
}
