import {Component, OnInit} from '@angular/core';
import {BikeService} from "./bike.service";
import {BehaviorSubject, merge, Subject} from "rxjs";
import {debounceTime, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  distance = 300;
  private longitude: any = 0;
  private latitude: any = 0;

  distanceChange$: BehaviorSubject<number> = new BehaviorSubject(this.distance);
  locationReceived$: Subject<void> = new Subject();


  bikes$ = merge(this.distanceChange$, this.locationReceived$).pipe(debounceTime(200)).pipe(
    switchMap(() => this.bikeService.findNext$(this.longitude, this.latitude, this.distance))
  );

  constructor(public bikeService: BikeService) {

  }

  ngOnInit(): void {
    this.getLocation();
  }

  public getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => this.showPosition(pos), () => console.log('error'));
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  public showPosition(position) {

    this.longitude = position.coords.longitude;
    this.latitude = position.coords.latitude;
    this.locationReceived$.next();
    console.log("Latitude: " + this.longitude +
      "Longitude: " + this.latitude);
  }


}
