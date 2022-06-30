import { inject, TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('HeroSerice Test', ()=>{
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let heroServiceAgent: HeroService; // The handle to reach HeroService in providers in TestBed *

    beforeEach(()=>{
        mockMessageService = jasmine.createSpyObj(["add"]);
        TestBed.configureTestingModule({
            imports:[ HttpClientTestingModule ],
            providers:[
                HeroService, //*
                { provide: MessageService, useValue:mockMessageService }
            ],
        });

        httpTestingController = TestBed.inject(HttpTestingController); //inject httpTestingController to TestBed
        heroServiceAgent = TestBed.inject(HeroService);
        // let messageServiecInjected = TestBed.inject(MessageService);
    });

    describe('getHero', ()=>{
        it('should call get with the correct URL', () => {
            // call getHero()
            heroServiceAgent.getHero(4);
            // test that the URL was correct
            httpTestingController.
        });

        it('should call get with the correct URL with inside inject', inject(
            [HeroService, HttpTestingController], 
            (service: HeroService, controller: HttpTestingController) => {
            // call getHero()
            service.getHero(4);
            // test that the URL was correct
        }));
    });
})