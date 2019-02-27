/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { CompleteProfileComponent } from './complete-profile.component';

let component: CompleteProfileComponent;
let fixture: ComponentFixture<CompleteProfileComponent>;

describe('complete-profile component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CompleteProfileComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(CompleteProfileComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});