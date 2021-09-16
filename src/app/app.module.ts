import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { PainelComponent } from './models/dashboard/painel/painel.component';
import {MatButtonModule} from '@angular/material/button';
import { CCanvaComponent } from './models/dashboard/ccanva/ccanva.component';
import { ListPolComponent } from './models/dashboard/list-pol/list-pol.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatRippleModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { SplashScreenComponent } from './models/splash-screen/splash-screen.component';
@NgModule({
  declarations: [
    AppComponent,
    PainelComponent,
    CCanvaComponent,
    ListPolComponent,
    SplashScreenComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    //material 
    MatToolbarModule,
    MatRippleModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule, 
    MatExpansionModule,
    MatFormFieldModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
