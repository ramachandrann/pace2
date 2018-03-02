import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable }    from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { NPIRegistryProviderService } from './npi-registry-provider.service';
import { NPIRegistryProvider } from './npi-registry-provider';

@Component({
  selector: 'ep-referring-provider-5010d-2310a',
  templateUrl: './referring-provider-5010d-2310a.component.html',
  styleUrls: ['./referring-provider-5010d-2310a.component.css'],
  providers:[NPIRegistryProviderService]
})
export class ReferringProvider5010d2310aComponent implements OnInit {
  npiRegistryProviders: Observable<NPIRegistryProvider[]>;
  searchTerm = new Subject<string>();
  selectedProvider: NPIRegistryProvider;

  constructor(private npiRegistryProviderService: NPIRegistryProviderService,
    private router: Router) {}

  ngOnInit(): void {
    this.npiRegistryProviders = this.searchTerm
      .debounceTime(500)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.npiRegistryProviderService.search(term)
        // or the observable of empty providers if there was no search term
        : Observable.of<NPIRegistryProvider[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<NPIRegistryProvider[]>([]);
      });
  }

  onSelectingProvider(provider): void {
    this.selectedProvider = provider;
  }
}
