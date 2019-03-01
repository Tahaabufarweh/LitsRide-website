import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
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
import { FilteringComponent } from '../app/filtering/filtering.component';
import { CompleteProfileComponent } from '../app/complete-profile/complete-profile.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

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
        provider: new GoogleLoginProvider("79683878315-9fqpne6k711es3h6tfgoo09ui4keneol.apps.googleusercontent.com")
      }
    ]
  );

  return config;
}
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    NewTripComponent,
    TripsComponent,
    ProfileComponent,
    RatingComponent,
    FilteringComponent,
    CompleteProfileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    GooglePlaceModule,
    AngularDateTimePickerModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    SocialLoginModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: TripsComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'new-trip', component: NewTripComponent },
      { path: 'trips', component: TripsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'rating', component: RatingComponent },
      { path: 'filtering', component: FilteringComponent },
      { path: 'complete-profile', component: CompleteProfileComponent },
    ])
  ],
  providers: [
    InternationalizationService,
    TripsService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
