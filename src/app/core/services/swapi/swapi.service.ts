import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(
    private http: HttpClient
  ) {}

  getData(url: string) {
    return this.http.get(`${url}`).pipe(
      map(data => {
        return JSON.parse(
          JSON.stringify(data)
        );
      })
    );
  }
}
