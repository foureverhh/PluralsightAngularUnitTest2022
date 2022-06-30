import { inject, TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('HeroSerice Test', ()=>{
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let heroServiceAgent: HeroService; // The handle to reach HeroService in providers in TestBed *
    let heroesUrl = 'api/heroes';  

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
            heroServiceAgent.getHero(4).subscribe(hero => {
                expect(hero.id).toBe(4);
                expect(hero).toEqual({id:4, name:'SuperDude', strength: 100});
            }); //to subscribe the result of getHero(id) observable, actually the mock result from req.flush();
            
            // test that the URL was correct
            const req = httpTestingController.expectOne(heroesUrl + '/4');
            req.flush({id:4, name:'SuperDude', strength: 100}) //mock return responce for request
            expect(req.request.method).toBe('GET'); //check request method is GET
            httpTestingController.verify();
        });

        it('should call get with the correct URL with inside inject', inject(
            [HeroService, HttpTestingController], 
            (service: HeroService, controller: HttpTestingController) => {
            // call getHero(), and subscribe() to call the http.get()
            service.getHero(1).subscribe(hero => {
                expect(hero).toEqual({id:1, name:'haha', strength:100}); //check result from http is correct
            }); 
            // test that the URL was correct
            let testRequest = controller.expectOne(heroesUrl + '/1'); // to check right url is called
            testRequest.flush({id:1, name:'haha', strength:100}) //mock responce from testRequest
            expect(testRequest.request.method).toBe('GET'); // to check http method as GET
            controller.verify(); 
        }));
    });
})