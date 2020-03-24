import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  private urlApi: string = 'https://coronavirus-tracker-api.herokuapp.com/v2/';

  constructor(private http: HttpClient) { }

  public getLatest(): Observable<any> {
    return this.http.get(this.urlApi + 'latest').pipe(
      map((res: any[]) => {
        return res;
      })
    );
  }

  public getBrasil(): Observable<any> {
    return this.http.get(this.urlApi + 'locations/35').pipe(
      map((res: any[]) => {
        return res;
      })
    );
  }

}
