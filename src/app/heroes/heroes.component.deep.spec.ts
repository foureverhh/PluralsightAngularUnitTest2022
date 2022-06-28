import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { HeroComponent } from '../hero/hero.component';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { of } from 'rxjs';
import { Hero } from '../hero';
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
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
    });

    it('should be true', () => {
        
        expect(true).toBe(true);
    });
})