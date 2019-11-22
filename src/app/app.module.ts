import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { NotificationComponent } from './notification/notification.component';
import { FriendComponent } from './friend/friend.component';
import { PollComponent } from './poll/poll.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { CreatepollComponent } from './createpoll/createpoll.component';
import { LoginInterceptor } from './login/LoginInterceptor';
import { LoginModule } from './login/login.module';
import { Poll } from './models/poll.model';
import { AuthGuard } from './guards/auth.guard';



const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'friend', component: FriendComponent, canActivate: [AuthGuard]},
  { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },
  { path: 'createpoll', component: CreatepollComponent, canActivate: [AuthGuard] },
  { path: 'poll', component: PollComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    NotificationComponent,
    FriendComponent,
    PollComponent,
    DashboardComponent,
    HeaderComponent,
    RegisterComponent,
    CreatepollComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    LoginModule,
    HttpClientModule
     ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoginInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
