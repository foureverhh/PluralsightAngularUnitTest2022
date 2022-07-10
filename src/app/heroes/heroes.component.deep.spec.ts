import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { HeroComponent } from '../hero/hero.component';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigateTo: any = null;

    onClick() {
        this.navigateTo = this.linkParams;
    }
}

describe('deep test with real child component', ()=>{
    let mockHeroService: any;
    let HEROES: Hero[];
    let fixture: ComponentFixture<HeroesComponent>;

    beforeEach(()=>{
        mockHeroService = jasmine.createSpyObj('HeroService',['addHero', 'getHeroes', 'deleteHero','deleteMyHero']);
        TestBed.configureTestingModule({
            declarations:[ HeroesComponent, HeroComponent, RouterLinkDirectiveStub ],
            providers: [
                { provide:HeroService, useValue:mockHeroService }
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
        spyOn(fixture.componentInstance, 'deleteHero'); //spy on deleteHero() method, watch on the mocked HeroesComponent on deleteHero method
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // run ngOnInit
        fixture.detectChanges();
        // looking for all HeroComponent in HeroesComponent 
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        // find the button on the first HeroComponent instance, and the click event
        heroComponents[0].query(By.css("button")).triggerEventHandler('click', {stopPropagation: () => {}});
        // trigger delete from child component
        // (<HeroComponent> heroComponents[0].componentInstance).delete.emit(HEROES[0]); // Comvert heroComponents[0].componentInstance to HeroComponent
        // (<HeroComponent> heroComponents[0].componentInstance).delete.emit(undefined);

        heroComponents[0].triggerEventHandler('delete', null); // same trggering delete event on HeroCompont, but this is from parent debugElement
        expect(fixture.componentInstance.deleteHero).toHaveBeenCalledWith(HEROES[0]); //HEROES[0] is as parameter when delete is called
    });

    it(`should add a new hero to the hero list when the add button is clicked`, () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // get all heroes
        fixture.detectChanges();
        
        const newHeroName = "Mr. Ice";
        const lastHero = { id:4, name: newHeroName, strength: 4};
        mockHeroService.addHero.and.returnValue(of(lastHero));
        const inputElement = fixture.debugElement.query(By.css('input'));
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
        inputElement.nativeElement.value = newHeroName;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges(); //call onInit to refresh 

        const lastHeroComponents = fixture.debugElement.queryAll(By.css('li'));
        expect(lastHeroComponents.length).toEqual(4);
        expect(lastHeroComponents[3].nativeElement.innerText).toContain(newHeroName);
    });

    it(`should call add  when add a new hero to the hero list`, () => {
    
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
     // get all heroes
    fixture.detectChanges();
    spyOn(fixture.componentInstance, 'add'); // watch on mocked HeroesComponent on add method
    
    const newHeroName = "Mr. Ice";
    const lastHero = { id:4, name: newHeroName, strength: 4};
    mockHeroService.addHero.and.returnValue(of(lastHero));
    const inputElement = fixture.debugElement.query(By.css('input'));
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
    inputElement.nativeElement.value = newHeroName;
    addButton.triggerEventHandler('click', null);
    
    fixture.detectChanges(); //call onInit to refresh 
    const lastHeroComponents = fixture.debugElement.queryAll(By.css('li'));
    expect(lastHeroComponents.length).toEqual(3);
    expect(fixture.componentInstance.add).toHaveBeenCalledWith(newHeroName);
});

    it('shoudl add a new hero to the hero list when the add button is clicked', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // run ngOnInit
        fixture.detectChanges();
        const newHeroName = "Mr. Ice";
        mockHeroService.addHero.and.returnValue(of({ id:"5", name:newHeroName, strength: 4}));
        
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0]; 


        // // mock input element get value by typing Mr.ice to input
        inputElement.value = newHeroName;
        addButton.triggerEventHandler('click', null); // as this click will call add() method, that is why null as eventObject, because we do not really use that one
        
        fixture.detectChanges();
        // alternative 1 find Jquery() textContent of ul
        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain(newHeroName);
        // alternative 2 find Jquery() innerText of li
        const heroLis = fixture.debugElement.queryAll(By.css('li'));
        expect(heroLis[3].nativeElement.innerText).toContain(newHeroName);
        // alternative 3 
        const heroElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroElements[3].nativeElement.innerText).toContain(newHeroName);
    });

    it('should have correct route for the first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        let routerLink = heroComponents[0]
                        .query(By.directive(RouterLinkDirectiveStub)) //search for the DebugElement which has an RouterLinkDirectiveStub on it, here that is <a> debugElement
                        .injector.get(RouterLinkDirectiveStub); // get the RouterLinkDirectiveStub directive inside the anchor tag
        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);
        expect(routerLink.navigateTo).toEqual('/detail/1');
    });
})