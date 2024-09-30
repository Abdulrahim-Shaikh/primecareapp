import { RestService } from "./core/RestService";

export class PackageService extends RestService<any> {

    getPackages() {
        return this.get(`getPackages/`);
    }

    getPackagesByBranch(branch: string) {
        return this.get(`byBranch/${branch}`);
    }

}
const packageService = new PackageService('servicepackage');
export default packageService;