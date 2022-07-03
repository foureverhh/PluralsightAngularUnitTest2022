import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { HeroComponent } from '../hero/hero.component';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
describe('deep test with real child component', ()=>{
    let mockHeroService: any;
    let HEROES: Hero[];
    let fixture: ComponentFixture<HeroesComponent>;

    beforeEach(()=>{
        mockHeroService = jasmine.createSpyObj(['addHero', 'getHeroes', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations:[ HeroesComponent, HeroComponent ],
            providers: [
                { provide:HeroService, useValue:mockHeroService}
            ]
        });
        fixture = TestBed.createComponent(HeroesComponent);
        HEROES = [
            {id: 1, name:'name1', strength:1},
            {id: 2, name:'name2', strength:2},
            {id: 3, name:'name3', strength:3}
        ];
        
        
    });

    it('should be true', () => {
        expect(true).toBe(true);
    });

    it('should render each hero as a HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // run ngOnInit
        fixture.detectChanges();
        // component actual is a directive, directive is the parent class to compoent, so use By.directive 
        // find all HeroComponent
        let heroComponentsDebugElement = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentsDebugElement.length).toEqual(3);
        let firstHeroComponent = heroComponentsDebugElement[0].componentInstance;
        expect(firstHeroComponent.hero).toEqual(HEROES[0]);
        for(let i=0; i<heroComponentsDebugElement.length;i++) {
            expect(heroComponentsDebugElement[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    });

    it(`should call heroService.deleteHero, when the HeroComponent's delete butten is clicked`, () => {
        spyOn(fixture.componentInstance, 'deleteHero'); //watch on the mocked HeroesComponent on deleteHero method
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // run ngOnInit
        fixture.detectChanges();
        // looking for all HeroComponent in HeroesComponent 
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        // find the button on the first HeroComponent instance, and the click event
        heroComponents[0].query(By.css("button")).triggerEventHandler('click', {stopPropagation: () => {}});
        (<HeroComponent> heroComponents[0].componentInstance).delete.emit(undefined); // Comvert heroComponents[0].componentInstance to HeroComponent
        expect(fixture.componentInstance.deleteHero).toHaveBeenCalledWith(HEROES[0]); //HEROES[0] is as parameter when delete is called
    })
})