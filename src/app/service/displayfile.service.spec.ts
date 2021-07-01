import { TestBed } from '@angular/core/testing';
import { DisplayFile } from '../bussines/displayFile';

import { DisplayfileService } from './displayfile.service';

export class DisplayService {

  constructor(){}
  
  public displayFile: DisplayFile

  onCreate(){
    this.displayFile = new DisplayFile
  }

}