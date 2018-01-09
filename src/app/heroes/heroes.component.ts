import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  //selectedHero : Hero ;

  constructor(
     private route : ActivatedRoute,
     private location : Location, 
     private heroService : HeroService ) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() : void{
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  addHero(name : string) : void{
    name = name.trim();
    if(!name){
      return ;
    }
    this.heroService.addNewHero({name} as Hero)
    .subscribe(
        hero => {
        this.heroes.push(hero);
      }
    )
  }  

  deleteHero(hero : Hero) : void{
    this.heroes = this.heroes.filter(x => x !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
