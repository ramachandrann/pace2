import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NPIRegistryProvider }    from './npi-registry-provider';
@Injectable()
export class NPIRegistryProviderService {
  
  constructor(private http: Http) {}

  search(term: string): Observable<NPIRegistryProvider[]> {
    return this.http
               .get(`https://npiregistry.cms.hhs.gov/api/?last_name=${term}`)
               .map(response => response.json().results as NPIRegistryProvider[]);
  }
}