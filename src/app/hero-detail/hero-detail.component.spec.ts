import { HeroDetailComponent } from './hero-detail.component';
import { TestBed, ComponentFixture, fakeAsync, tick, flush, waitForAsync } from '@angular/core/testing';
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

  it('should location back() be called,when save is called', (done) => {
    fixture.detectChanges();
    let saveButton = fixture.debugElement.queryAll(By.css('button'))[1];
    mockHeroService.updateHero.and.returnValue(of(true));
    saveButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    setTimeout(() => {
      expect(mockLocation.back).toHaveBeenCalled();
      done(); // done must be called here, otherwise expect(mockLocation.back).toHaveBeenCalled() would by skipped
    }, 300);

  });

  it('should call updateHero when save is called with setTimeout', (done) => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();
    fixture.componentInstance.save();
    setTimeout(()=> {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
      done(); // done must be called here, otherwise expect(mockLocation.back).toHaveBeenCalled() would by skipped
    }, 300);
  });

  //fakeAsync Helper turn async to sync unit test by run in a special time zone object, to fast forward time
  it('should call updateHero when save is called with fakeAysync Helper function', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();
    fixture.componentInstance.save();
    //tick(250); //tick back specfic 250 miliseconds with the help of zone.js,  runs in a speical time zone object
    flush(); //check whether there is any task is awaiting, if so fast forward the clock to those tasks are executed
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));

  // waitForAsync and fixture.whenStable() to test promise
  it('should call updateHero when saveInPromise is called with waiForAsync Helper function', waitForAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();
    fixture.componentInstance.saveInPromise();
    fixture.whenStable() //whenStable() means wait for thoes promise to be resolved
           .then(() => {
                expect(mockHeroService.updateHero).toHaveBeenCalled();
    })
  }));

   //fakeAsync Helper turn async to sync unit test by run in a special time zone object, to fix prommise
   it('should call updateHero when save is called with waitForAsync Helper function', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();
    fixture.componentInstance.saveInPromise();
    //tick(250); //tick back specfic 250 miliseconds with the help of zone.js,  runs in a speical time zone object
    flush(); //check whether there is any task is awaiting, if so fast forward the clock to those tasks are executed
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));

  it("how to get unit test coverage", () => {
    console.log("use ng test --no-watch --code-coverage to check source coverage");
    console.log("find \coverage\angular_pluralsight_unit_test index.html to find the report");
  });
})
