import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { PhotoSelectorComponent } from './photo-selector/photo-selector.component';
import { DndDirective } from './dnd.directive';

const appRoutes: Routes = [
  {path: 'createProfile', component: CreateProfileComponent},
  {path: 'homePage', component: HomePageComponent},
  {path: 'myAccount', component: MyAccountComponent},
  {path: 'loginPage', component: LoginPageComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'questionnaire', component: QuestionnaireComponent},
  {path: 'photoSelection', component: PhotoSelectorComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    CreateProfileComponent,
    LoginPageComponent,
    SignUpComponent,
    QuestionnaireComponent,
    PhotoSelectorComponent,
    DndDirective
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
