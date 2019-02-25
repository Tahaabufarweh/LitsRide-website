import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { DemoMaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewTripComponent } from './new-trip/new-trip.component';
import { TripsComponent } from './trips/trips.component';
import { RatingComponent } from './rating/rating.component';
import { ProfileComponent } from './profile/profile.component';
import { InternationalizationService } from './services/internationalization.service';
import { TripsService } from './services/trips.service';
import { UserService } from './services/user.service';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("tup5BITYUMsC-r5FSHTUt760")
      }

    ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    NewTripComponent,
    TripsComponent,
    ProfileComponent,
    RatingComponent,
    CounterComponent,
 

    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    AngularDateTimePickerModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    SocialLoginModule,
    DemoMaterialModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'new-trip', component: NewTripComponent },
      { path: 'trips', component: TripsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'rating', component: RatingComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [
    InternationalizationService,
    TripsService,
    UserService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
