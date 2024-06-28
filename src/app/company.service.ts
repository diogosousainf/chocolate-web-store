import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:3000/aboutUs'; // URL do backend

  constructor(private http: HttpClient) {}

  getCompanyInfo(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

