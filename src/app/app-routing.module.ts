import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PainelComponent } from './models/dashboard/painel/painel.component';
import { CCanvaComponent } from './models/dashboard/ccanva/ccanva.component';

const routes: Routes = [
  { path: '', component: PainelComponent },
  { path: 'canva', component: CCanvaComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
