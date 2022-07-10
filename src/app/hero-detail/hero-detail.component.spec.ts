import { HeroDetailComponent } from './hero-detail.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroService: any, mockActivatedRoute: any, mockLocation: any;

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
    mockHeroService.getHero.and.returnValue(of({id:1, name:'name', strength: 100}));
  });

  it('should render hero name in a h2 tag', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('h2')).nativeElement.innerText).toContain('NAME');
  });
})