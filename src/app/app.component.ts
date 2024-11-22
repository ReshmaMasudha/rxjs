import {Component, OnInit} from '@angular/core';
import { AuthStore } from './services/auth.store';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //Adding in providers to make it available to home component and its children.
  //providers: [LoadingService, MessageService]
})
export class AppComponent implements  OnInit {

    constructor(public authStore: AuthStore) {

    }

    ngOnInit() {


    }

  logout() {
    this.authStore.logout()
  }

}
