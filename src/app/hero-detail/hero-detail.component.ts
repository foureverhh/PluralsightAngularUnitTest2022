import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input()
  hero!: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const param = this.route.snapshot.paramMap.get('id');
    const id = param? + param:0;
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    debounce(this,()=>{
      this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
    },250, false)()
  }

  saveInPromise(): void {
    someThirdPartyPromise().then(()=> {
      this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
    })
  }

}

function debounce(ctext:any,func:any, wait:any, imdediate:any) {
  var timeout:any;
  return () => {
    var context = ctext, args = arguments;
    var later = function() {
      timeout = null;
      if(!imdediate) func.apply(context, args);
    };
    var callNow = imdediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if(callNow) func.apply(context, args);
  }
};

function someThirdPartyPromise() {
  return new Promise((resovle) => {
    resovle(null);
  })
}
