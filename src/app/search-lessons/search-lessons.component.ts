import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CoursesService } from '../services/courses.service';


@Component({
  selector: 'course',
  templateUrl: './search-lessons.component.html',
  styleUrls: ['./search-lessons.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SearchLessonsComponent implements OnInit {

  searchResult$: Observable<Lesson[]>;
  ActiveLesson: Lesson;
  constructor(private courseService: CoursesService) {


  }

  ngOnInit() {


  }

  onSearchClicked(search){
    this.searchResult$ = this.courseService.searchLessons(search);
  }

  openLesson(lesson){
    this.ActiveLesson = lesson;
  }

  backToSearchClicked(){
    this.ActiveLesson = null;
  }

}











