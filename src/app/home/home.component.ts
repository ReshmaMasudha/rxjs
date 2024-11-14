import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {Observable} from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { finalize, map } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(private courseService: CoursesService, private loadingService: LoadingService) {

  }

  ngOnInit() {
      this.reloadCourses();
  }

  reloadCourses() {

    this.loadingService.loadingOn()

    //courses observable to handle the data and sort it.
    const course$ = this.courseService.loadAllCourses().pipe(map( course => course.sort(sortCoursesBySeqNo)),finalize(() => this.loadingService.loadingOff())
  );

  //creating loader observable and assigning the value 
  // let loadingCourse$ = this.loadingService.showLoaderUntilComplete(course$);

  //loading course observable emits the value returned by the loader service.
      this.beginnerCourses$ = course$.pipe(map(courses => courses.filter(course => course.category == "BEGINNER")))

      this.advancedCourses$ = course$.pipe(map(courses => courses.filter(course => course.category == "ADVANCED")))
  }

}