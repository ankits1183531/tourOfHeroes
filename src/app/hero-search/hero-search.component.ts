import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Subject } from 'rxjs/Subject';
import { debounce } from 'rxjs/operators/debounce';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$ : Observable<Hero[]>;
  private searchValue = new Subject<string>();

  constructor(
    private heroService : HeroService
   ) { }

   search(searchVal : string) : void{
     this.searchValue.next(searchVal);
   }

  ngOnInit() {
    this.heroes$ = this.searchValue.pipe(

      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.heroService.searchHero(term)),

    )
  }

}
