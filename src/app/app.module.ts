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

@NgModule({
  declarations: [
    AppComponent,
    PainelComponent,
    CCanvaComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    //material 
    MatCardModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
