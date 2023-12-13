import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Details} from "../../models/details";

@Injectable({
  providedIn: "root",
})

export class DetailsService {

  constructor(private allHttp: HttpClient) {
    this.allHttp = allHttp;
  }

  getData(wkn: string | null): Observable<Details[]>{
    return this.allHttp.get<Details[]>(`http://localhost:8080/portfolio/all/${wkn}`);
  }
}
