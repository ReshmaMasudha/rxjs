import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { LoadingService } from "../loading/loading.service";
import { MessageService } from "../messages/messages.service";


@Injectable({
    providedIn: 'root',
})

export class CourseStore{

    private subject = new BehaviorSubject<Course[]>([]);
    courses$: Observable<Course[]> = this.subject.asObservable();

    constructor(private http: HttpClient, private loadingService: LoadingService, private messageService: MessageService){
        this.loadAllCourses();
    }

    //this method is private so cannot be called multiple times in the application.
    private loadAllCourses(){
        const loadCourses$ = this.http.get<Course[]>('/api/courses')
        .pipe(
            map(res => res["payload"]),
            catchError(err =>{
                const message = "could not load courses."
                this.messageService.showErrors(message);
                console.log(err, message)
                //returning the error with throwError method that emits an observable instantly cancelling the pervious observable.
                //replacing the courses$ with err obs
                return throwError(err);
            }),
            //save the course data in this subject and access everywhere.
            tap(courses => this.subject.next(courses))
    )

    //subscribing the loading observable so that it will return the load courses
    //returning an observable with loading indicator capabilities.
    //when subscribed, shows indicator and hides indicator when observable's lifecycle is over.
    this.loadingService.showLoaderUntilComplete(loadCourses$).subscribe();
    }

    saveCourse(courseId: string, changes: Partial<Course>): Observable<any>{
        //getting the value of the subject.
        const course = this.subject.getValue();
        const index = course.findIndex(course => course.id == courseId);

       //create new course object version of course containing all course changes.

       const newCourse : Course = {
        ...course[index],
        ...changes
       }

       //using slice() and creating a complete copy of the course array and modifying with the changes.
        const newCourses: Course[]= course.slice(0);
        newCourses[index] = newCourse

        //emitting the modified version in the subject and reflecting changes.
       this.subject.next(newCourses)
       console.log(this.courses$);
        return this.http.put(`/api/courses/${courseId}`, changes)
        .pipe(
              catchError(err =>{
              const message = "Course not saved"
              this.messageService.showErrors(message);
              console.log(message, err)
              return throwError(err);
            }),
            shareReplay()
        )
    }

    filterbyCategory(category: string): Observable<Course[]> {
        return this.courses$.
        pipe(
            map(courses => courses.filter(
                course => course.category == category)
                .sort(sortCoursesBySeqNo)))
    }
}