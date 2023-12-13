import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Overview} from "../../models/overview";

@Injectable({
  providedIn: "root",
})

export class OverviewService {
  private allUrl = `http://localhost:8080/portfolio/all`;


  constructor(private allHttp: HttpClient) {
    this.allHttp = allHttp;
  }

  getData(): Observable<Overview[]>{
    return this.allHttp.get<Overview[]>(this.allUrl);
  }
}
