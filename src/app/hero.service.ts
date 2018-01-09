import { Injectable } from '@angular/core';
import { Hero } from './hero';
//import { Heroes } from './mock-heroes';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { error } from 'selenium-webdriver';
import { log } from 'util';
// import { type } from 'os';
import { errorHandler } from '@angular/platform-browser/src/browser';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';
  heroesList;
  message: string;
  errorMessage: string[];

  constructor(
    private messageService: MessageService,
    private http: HttpClient

  ) { }

  private log(message: string) {
    this.messageService.add('Hero Service' + message);
  }

  // /** GET heroes from the server */
  getHeroes(): Observable<any> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
      );
  }

//   /**
//  * Handle Http operation that failed.
//  * Let the app continue.
//  * @param operation - name of the operation that failed
//  * @param result - optional value to return as the observable result
//  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET hero by id. Will 404 if id not found */
  findHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`Error id=${id}`))
    );
  }

  updateHero(updateElement : Hero) : Observable<Hero>{
    return this.http.put(this.heroesUrl , updateElement, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${updateElement.id}`)),
      catchError(this.handleError<any>('Error Hero'))
    )
  }

  addNewHero(name : Hero) : Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl,name,httpOptions).pipe(
      tap((hero : Hero) => {
        console.log(hero);       
      }),
      catchError(this.handleError<Hero>('Error'))
    );
  }

  deleteHero(hero : Hero) : Observable<Hero>{
    const id = typeof hero === "number"? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url,httpOptions).pipe(
      tap(_ => {
        console.log('Delete Successfully');
      }),
      catchError(this.handleError<Hero>('Error'))
    );
  }

  searchHero(searchValue  : string) : Observable<Hero[]>{
    if(!searchValue.trim()){
      return of([]);
    }
    return this.http.get<Hero[]>(`api/heroes/?name=${searchValue}`).pipe(
      tap( (hero : Hero[]) => {
        if(hero.length == 0){
          console.log('No Data Found');
        }else{
          console.log('searchHero' + hero);
        }
      }),
      catchError(this.handleError<Hero[]>('Error'))
    );
  }




  // getHeroes() : Observable<Hero[]>{
  //   this.messageService.add('HeroService : Data Feteched');
  //   return of(Heroes);
  // }

  // findHero(id: number) {
  //   return (this.heroesList.find(x => x.id == id));
  // }

    // getHeroes() : Observable<Hero[]>{
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //   .pipe((res) => {
  //     this.heroesList = res;
  //     return res;
  //   })
  // }

}
