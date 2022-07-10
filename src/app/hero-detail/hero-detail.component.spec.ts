import { HeroDetailComponent } from './hero-detail.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroService: any, mockActivatedRoute: any, mockLocation: any;let HERO: Hero;
  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj('Location', ['back']);
    mockActivatedRoute = {
      snapshot:{
        paramMap: {
          get: () => { return 3;}
        }
      }
    }

    TestBed.configureTestingModule({
      imports:[ FormsModule ], //To test ngModule
      declarations: [ HeroDetailComponent ],
      providers: [
        {provide: HeroService, useValue: mockHeroService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: Location, useValue: mockLocation},
      ]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
    HERO = {id:1, name:'name', strength: 100};
    mockHeroService.getHero.and.returnValue(of(HERO));
  });

  it('should render hero name in a h2 tag', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('h2')).nativeElement.innerText).toContain('NAME');
  });

  it('should location back() be called,when save is called', () => {
    fixture.detectChanges();
    let saveButton = fixture.debugElement.queryAll(By.css('button'))[1];
    mockHeroService.updateHero.and.returnValue(of(true));
    saveButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(mockLocation.back).toHaveBeenCalled();
  });
})