import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";


@Injectable()

export class LoadingService{

    constructor(){
        console.log("loading service created...")
    }

    loadingSubject = new BehaviorSubject<boolean>(false);
    
    loading$:Observable<boolean> = this.loadingSubject.asObservable();

    showLoaderUntilComplete<T>(obs$ : Observable<T>) : Observable<T>{
        //using of method to emit fake observable value.
        return of(null)
        .pipe(
            //method to render a side effect 
            tap(() =>
                 this.loadingOn()
        ),
        //replaces the null observable emitted by of method with the input observable
        //make this of(null) to emit the observable value so using concatMap
        concatMap(() => obs$),
        //once the value is emitted, the finalize method is called to dismiss the loader.
        finalize(() => this.loadingOff())
     )
        
    }

    loadingOn(){
        this.loadingSubject.next(true)
    }


    loadingOff(){
        this.loadingSubject.next(false)
    }
}