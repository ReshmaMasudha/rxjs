import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {combineLatest, Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CoursesService } from '../services/courses.service';
import { map, startWith, tap } from 'rxjs/operators';


interface courseData{
  course:Course,
  lessons: Lesson[]
}
@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {

  data$: Observable<courseData>;

  constructor(private route: ActivatedRoute, private courseService: CoursesService) {


  }

  ngOnInit() {

    const courseId = parseInt(this.route.snapshot.paramMap.get("courseId"));

    const course$ = this.courseService.loadCourseById(courseId).pipe(
      startWith(null)
    );

    const lessons$ = this.courseService.loadAllCourseLessons(courseId).pipe(
      startWith([])
    );

    this.data$ = combineLatest([course$, lessons$]).pipe(
      map(([course, lessons]) =>{
        return {course, lessons}
      }),
      tap(console.log)
    )

  }


}











