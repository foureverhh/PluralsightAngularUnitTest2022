import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
// shallow test with child component and service dependency
describe('heroes component (shallow test demo with child component and service dependency)', ()=> {
  let fixture: ComponentFixture<HeroesComponent>;
  let HEROES: Hero[];

  //mock HeroService dependency
  let mockHeroService: any;

  //fake a HeroComponent as <app-hero></app-hero>
  
  @Component({
  selector: 'app-hero',
  template: '<div>fakeHeroComponent</div>',
  })
  class FakeHeroComponent {
    @Input()
    hero!: Hero;
  }


  beforeEach(()=> {
    mockHeroService = jasmine.createSpyObj(['addHero', 'getHeroes', 'deleteHero']);
    HEROES = [
      {id: 1, name:'name1', strength:1},
      {id: 2, name:'name2', strength:2},
      {id: 3, name:'name3', strength:3}
    ];
    TestBed.configureTestingModule({
      declarations: [ 
        HeroesComponent,
        FakeHeroComponent 
      ],
      // schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heroes correctly', ()=> {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges(); //to call angular lifecycle, so onInit() heroService.getHeroes() is called. No need to call fixture.componentInstance.heroes = HEROES;
    // fixture.componentInstance.heroes = HEROES;
    expect(fixture.componentInstance.heroes.length).toEqual(HEROES.length);
  });

  //check template *ngIf let hero of heroes has three li element according to HERORES has three elements
  it('should create one li for each hero', ()=> { 
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  });
  
});