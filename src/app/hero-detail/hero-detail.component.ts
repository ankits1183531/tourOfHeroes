import { Component, OnInit ,Input } from '@angular/core';
import { Hero } from '../hero'
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // @Input() hero:Hero;
  
   hero : Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getPerticularHero();
    setTimeout( () => {
      console.log('This is from set timeout' , this.hero)
    },1000)
  }

  getPerticularHero() : void{
    const id =+ this.route.snapshot.paramMap.get('id');
    //this.hero = this.heroService.findHero(id);
    this.heroService.findHero(id).subscribe((res: any) => {
      console.log("SSS", res)
      this.hero = res;
    });
  }

  save() : void{
    this.heroService.updateHero(this.hero)
    .subscribe(
      () => this.goBack()
    );
  }

  goBack() : void {
      this.location.back();
  }
}
