import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('HeroSerice Test', ()=>{
    let mockMessageService;
    let httpTestingController: HttpTestingController;

    beforeEach(()=>{
        mockMessageService = jasmine.createSpyObj(["add"]);
        TestBed.configureTestingModule({
            imports:[ HttpClientTestingModule ],
            providers:[
                HeroService,
                { provide: MessageService, useValue:mockMessageService }
            ],
        });

        httpTestingController = TestBed.inject(HttpTestingController); //inject httpTestingController to TestBed
        // let heroServiceInjected = TestBed.inject(HeroService);
        // let messageServiecInjected = TestBed.inject(MessageService);
    })
})