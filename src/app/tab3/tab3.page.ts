import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  ToastController,
  IonItem,
  IonInput, IonButton, IonCardHeader, IonCard, IonCardSubtitle, IonRow, IonImg, IonText, IonCardTitle, IonCardContent
} from '@ionic/angular/standalone';
import {DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonCardHeader, IonCard, IonCardSubtitle, IonRow, IonImg, IonText, IonCardTitle, IonCardContent, DatePipe, FormsModule],
})
export class Tab3Page {
  API_GEO_URL: string = 'http://api.openweathermap.org/geo/1.0/direct?q=__city__&appid=05f9485642a4d913df1e2b5fd6079d96';
  API_WEATHER_URL: string = 'https://api.openweathermap.org/data/2.5/weather?lat=__lat__&lon=__lon__&units=metric&lang=fr&appid=05f9485642a4d913df1e2b5fd6079d96'
  cityName: string = '';

  weatherDataIcon: string = '';

  geolocalisation: any = null;
  weatherData: any = null;

  constructor(private toaster: ToastController) { }

  async search() {
    this.geolocalisation = await fetch(this.API_GEO_URL.replace('__city__', this.cityName))
      .then(response => response.json());

    if (this.geolocalisation.length === 0) {
      await this.presentToast();
    } else {
      this.weatherData = await fetch(this.API_WEATHER_URL
        .replace('__lat__', this.geolocalisation[0].lat)
        .replace('__lon__', this.geolocalisation[0].lon))
        .then(response => response.json());
      this.weatherDataIcon = `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}.png`;
    }
  }

  async presentToast() {
    const toast = await this.toaster.create({
      message: 'No weather data found',
      duration: 3000,
      color: "danger",
      buttons: [
        {
          role: 'cancel',
          icon: 'close'
        }
      ]

    })
    await toast.present();
  }
}
