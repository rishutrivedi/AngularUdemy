import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from "@auth0/angular-jwt";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { JwtUnAuthorizedInterceptorService } from './interceptors/jwt-un-authorized-interceptor.service';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AlertDirective } from './directives/alert.directive';
import { RepeaterDirective } from './directives/repeater.directive';
import { EmployeeModule } from './employee/employee.module';
import { SharedModule } from './shared/shared.module';
import { AboutComponent } from './admin/components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent,
    SignUpComponent,
    AlertDirective,
    RepeaterDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    EmployeeModule,
    JwtModule.forRoot( {
      config: {
        tokenGetter: () => {
          return (sessionStorage.getItem("currentUser")? JSON.parse(sessionStorage.getItem("currentUser")).token : null)
        }
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtUnAuthorizedInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
