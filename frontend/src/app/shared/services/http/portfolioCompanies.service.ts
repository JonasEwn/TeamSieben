import {Injectable} from "@angular/core";
import {PortfolioCompanies} from "../../models/portfolioCompanies";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})

export class PortfolioCompaniesService {

  private companyUrl = 'http://localhost:8080/companies';
  private companyPostUrl = 'http://localhost:8080/companies';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private companyHttp: HttpClient) {
  }

  getCompaniesData(): Observable<PortfolioCompanies[]>{
    return this.companyHttp.get<PortfolioCompanies[]>(this.companyUrl);
  }

  sendData(data: any){
    data = Object.assign({},...data)
    return this.companyHttp.post(this.companyPostUrl, data, this.httpOptions);
  }
}
