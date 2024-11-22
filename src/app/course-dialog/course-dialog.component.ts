import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import moment from 'moment';
import { CourseStore } from '../services/course.store';
import { MessageService } from '../messages/messages.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    //adding in course dialog providers because, loading service is added in providers of App component and available for all home components and its children. sine this component is not a direct child of home component added in providers.
    providers:[CourseStore]
})
export class CourseDialogComponent implements AfterViewInit {
    form: FormGroup;

    course:Course;

    constructor(
        private fb: FormBuilder,
        public courseStore: CourseStore,
        private messageService: MessageService,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });
    }

    ngAfterViewInit() {

    }

    save() {
      const changes = this.form.value;
      // this.courseStore.saveCourse(this.course.id, changes)
      // .pipe(
      //   catchError(err =>{
      //   const message = "Couse not saved"
      //   this.messageService.showErrors(message);
      //   console.log(message, err)
      //   return throwError(err);
      // })
      // ).subscribe();

      this.courseStore.saveCourse(this.course.id, changes).subscribe();

      this.dialogRef.close(changes);

//calling loading service method.
// this.loadingService.showLoaderUntilComplete(saveCourse$).subscribe(res =>{
//   this.dialogRef.close(res);
// })

    }

    close() {
        this.dialogRef.close();
    }

}
