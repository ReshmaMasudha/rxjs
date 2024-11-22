import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../model/course';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import {filter, tap} from 'rxjs/operators';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesCardListComponent implements OnInit {

  @Input()
  courses: Course[] = [];

  @Output()
  private coursesChanged = new EventEmitter();

  constructor(private dialog: MatDialog) {

  }

  ngOnInit() {

  }

    editCourse(course: Course) {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "400px";

        dialogConfig.data = course;

        const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

        //after the dialog is closed, checking whether value is emitted and emitting to update the course list.
        dialogRef.afterClosed()
            .pipe(
                filter(val => !!val),
                tap(() => this.coursesChanged.emit())

            )
            .subscribe();


    }

}