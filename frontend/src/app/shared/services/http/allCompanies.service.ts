import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AllCompanies} from "../../models/allCompanies";

@Injectable({
  providedIn: "root",
})

export class AllCompaniesService {
  private allUrl = 'http://localhost:8080/portfolio/all'


  constructor(private allHttp: HttpClient) {
    this.allHttp = allHttp;
  }

  getData(): Observable<AllCompanies[]>{
    return this.allHttp.get<AllCompanies[]>(this.allUrl);
  }
}
