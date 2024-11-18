import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import { CourseStore } from '../services/course.store';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(private courseStore: CourseStore) {

  }

  ngOnInit() {
      this.reloadCourses();
  }

  reloadCourses() {
    
    //courses observable to handle the data and sort it.
  //   const course$ = this.courseService.loadAllCourses()
  //   .pipe(
  //     map(course => course.sort(sortCoursesBySeqNo)),

  //   //using catch error Rxjs operator to handle the error.
  //   catchError(err =>{
  //     const message = "could not load courses."
  //     this.messageService.showErrors(message);
  //     console.log(err, message)
  //     //returning the error with throwError method that emits an observable instantly cancelling the pervious observable.
  //     //replacing the courses$ with err obs
  //     return throwError(err);
  //   })
  // );



  //creating loader observable and assigning the value 
  //let loadingCourse$ = this.loadingService.showLoaderUntilComplete(course$);

  //loading course observable emits the value returned by the loader service.
      this.beginnerCourses$ = this.courseStore.filterbyCategory("BEGINNER");

      this.advancedCourses$ = this.courseStore.filterbyCategory("ADVANCED");
  }

}