import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  loader$: Observable<boolean>;


  //making the loading service public to be accessible in many templates and other componnets.
  constructor(public loadingService: LoadingService) {

  }

  ngOnInit() {

  }


}
