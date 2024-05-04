import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CalculatePayload, CalculateResult} from "../interfaces/interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommandsService {
  private readonly baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  calculate(payload: CalculatePayload): Observable<CalculateResult> {
    return this.http.post<CalculateResult>(this.baseUrl + '/calc', payload);
  }


}
