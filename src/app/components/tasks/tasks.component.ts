import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import {Task} from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) { 

  }

  // subscribe to Observable
  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks
      }
    );
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe( // this line calls the service to delete from the server
      () => (
        this.tasks = this.tasks.filter( (t)=> t.id !== task.id ) //this filters it to delete from the UI
      )
    );
  }

  toggleReminder(task: Task): void {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }
  
  addTask(task: Task){
    this.taskService.addTask(task).subscribe(
      (task) => (this.tasks.push(task))
    );
  }

}
