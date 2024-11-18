import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable()

export class MessageService{

    //new behaviour subject to 
    private subject = new BehaviorSubject<string[]>([]);

    errors$: Observable<string[]> =  this.subject.asObservable()
    //method to prevent the observable emitting null array values
    .pipe(filter(messages => messages && messages.length > 0));

    showErrors(...error: string[]){
        this.subject.next(error);
    }
}