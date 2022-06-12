import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Component } from '@angular/core';

describe('heroes component', ()=>{
  let heroesComponent: HeroesComponent;
  let HERORES: Hero[];
  let mockHeroSevice:any; // mockHeroService must be type any to match createSpyObject

  beforeEach(() => {
    HERORES = [
      {id: 1, name:'name1', strength:1},
      {id: 2, name:'name2', strength:2},
      {id: 3, name:'name3', strength:3}
    ];

    mockHeroSevice = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    heroesComponent = new HeroesComponent(mockHeroSevice);
  });

  describe('delete', () => {
    it('should remove the indicated hero from the heroes list', () => {
        mockHeroSevice.deleteHero.and.returnValue(of(true));
        heroesComponent.heroes = HERORES;
        heroesComponent.delete(HERORES[1]);
        expect(heroesComponent.heroes.length).toEqual(2);
        // expect(heroesComponent.heroes).toEqual([]);
        expect(heroesComponent.heroes[0]).toEqual({id: 1, name:'name1', strength:1});
        expect(heroesComponent.heroes[1]).toEqual({id: 3, name:'name3', strength:3});
    });
  });

  describe('add', ()=> {
    it('should add one indicated hero', () => {
      mockHeroSevice.addHero.and.returnValue(of({name:'name4', strength: 11}));
      heroesComponent.heroes = HERORES;
      heroesComponent.add('name4');
      // expect(heroesComponent.heroes).toEqual([]);
      expect(heroesComponent.heroes.length).toEqual(4);
      expect(heroesComponent.heroes[3].name).toEqual('name4');
      expect(heroesComponent.heroes[3].strength).toEqual(11);
    });
  });
  
  describe('get Heros', ()=> {
    it('should get all heroes', () => {
      mockHeroSevice.getHeroes.and.returnValue(of(HERORES));
      heroesComponent.getHeroes();
      expect(heroesComponent.heroes).toEqual(HERORES);
    });
  })
});