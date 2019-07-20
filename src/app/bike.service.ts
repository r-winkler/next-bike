import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  readonly url = "http://localhost:3000/bikes";

  constructor(private http: HttpClient) { }

  findNext$(longitude: any, latitude: any, distance: any): Observable<any> {
    return this.http.get<any>(this.url, {params: {lon: longitude, lat: latitude, dist: distance}});
  }

}
