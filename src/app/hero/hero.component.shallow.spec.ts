// shallow test means only test the component not child component or directive

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from './hero.component';

// Testbed is for to test both component and template together
describe('Hero component(shallow tests)', ()=>{
    //fixture is a wrapper class of HeroComponent and template for test
    let fixture:ComponentFixture<HeroComponent>;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations: [ HeroComponent ],
            schemas: [ NO_ERRORS_SCHEMA ] //fix warning of routerLink in console
        });
        fixture = TestBed.createComponent(HeroComponent); 
    });

    it('should have the correct hero', ()=> {
        //fixture.componentInstance is the HeroComponent instance for test
        fixture.componentInstance.hero = { id: 1, name: 'name1', strength: 1 };
        fixture.detectChanges();
        expect(fixture.componentInstance.hero.name).toEqual('name1');
    });
});