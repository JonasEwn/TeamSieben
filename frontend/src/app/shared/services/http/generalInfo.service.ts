import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GeneralInfo} from "../../models/generalInfo";

@Injectable({
  providedIn: "root",
})

export class GeneralInfoService {

  constructor(private infoHttp: HttpClient) {
  }

    getData(wkn: string | null): Observable<GeneralInfo[]>{
    return this.infoHttp.get<GeneralInfo[]>(`http://localhost:8080/companies/info/${wkn}`);
  }
}
