import { Component, OnInit } from '@angular/core';
import { DisplayfileService } from 'src/app/service/displayfile.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  constructor(public displayService: DisplayfileService) { }
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;
  ngOnInit(): void {
    console.log('d',this.displayService.display)
  }
  initial(){
    console.log('-')
  }
}
