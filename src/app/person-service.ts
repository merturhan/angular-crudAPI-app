import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from  '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PersonService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getPersons(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/all`);
  }

  public addPerson(person: any): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/add`, person);
  }

  public updatePerson(personID : number ,person: any): Observable<any> {
    return this.http.put(`${this.apiServerUrl}/update/${personID}`, person);
  }

  public deletePerson(personID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${personID}`);
  }
}