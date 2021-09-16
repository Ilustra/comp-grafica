import { Component, Input, OnInit } from '@angular/core';
import { SplashAnimationType } from '../enum/enum';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit {
  windowWidth: string;
  splashTransition: string;
  opacityChange: number = 1;
  showSplash = true;

  @Input() animationDuration: number = 1.5;
  @Input() duration: number = 10;
  @Input() menssagem: string = 'carregando';

  @Input() animationType: SplashAnimationType = SplashAnimationType.SlideLeft;

  constructor(){}
  ngOnInit(): void {
    setTimeout(() => {
      let transitionStyle = "";
      switch (this.animationType) {
        case SplashAnimationType.SlideLeft:
          this.windowWidth = "-" + window.innerWidth + "px";
          transitionStyle = "left " + this.animationDuration + "s";
          break;
        case SplashAnimationType.SlideRight:
          this.windowWidth = window.innerWidth + "px";
          transitionStyle = "left " + this.animationDuration + "s";
          break;
        case SplashAnimationType.FadeOut:
          transitionStyle = "opacity " + this.animationDuration + "s";
          this.opacityChange = 0;
      }

      this.splashTransition = transitionStyle;

      setTimeout(() => {
        this.showSplash = !this.showSplash;
      }, this.animationDuration * 1000);
    }, this.duration * 1000);
  }
}
