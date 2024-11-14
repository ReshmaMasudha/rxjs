import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { map, shareReplay } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})

export class CoursesService{

    constructor(private http: HttpClient){

    }

    loadAllCourses(): Observable<Course[]>{
        console.log(this.http.get('/api/courses'));
        console.log(this.http.get('/api/courses').pipe(map(res => res['payload'])));
        console.log(this.http.get<Course[]>('/api/courses').pipe(map( res => res["payload"])));
        //share replay is to prevent multiple API calls when subscribed amny times.
        return this.http.get<Course[]>('/api/courses').pipe(map( res => res["payload"]), shareReplay());
    }

    saveCourseData(courseId, changes): Observable<any>{
        return this.http.put(`/api/courses/${courseId}`, changes).pipe(shareReplay())
    }
}