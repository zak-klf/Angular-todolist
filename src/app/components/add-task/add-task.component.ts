import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  text:string = "text";
  day:string = "day";
  reminder: boolean = false;
  subscription!: Subscription;
  showAddTask!: boolean;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(
      (value) => {this.showAddTask = value;}
    );
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (!this.text) {
      alert('Please add task');
      return;
    }
    const newTask = {
      text: this.text,
      day: this.day,
      reminder : this.reminder
    };

    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
