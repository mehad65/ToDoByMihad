import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ITask } from 'src/app/Model/ITask';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoForm!:FormGroup;
  todoList:ITask[]=[];
  inProgressList:ITask[]=[];
  doneList:ITask[]=[];

  holdIndex!:number;
  isUpdate:boolean=false;
  constructor(private fb:FormBuilder)
  {
    
  }
  
  ngOnInit(): void 
  {
    this.todoForm=this.fb.group({
      item:["",Validators.required]
    })
  }
  //functions is here
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
 EditTask(index:number){
    this.todoForm.controls["item"].setValue(this.todoList[index].description);
    this.isUpdate=true;
    this.holdIndex=index;
 }
 UpdateTask(index:number){
    this.todoList[this.holdIndex].description=this.todoForm.value.item;
    this.isUpdate=false;
    this.todoForm.reset();
 }
 DeleteTask(index:number){
  this.todoList.splice(index,1);
 }
 DeleteInProgressTask(index:number){
  this.inProgressList.splice(index,1);
 }
 DeleteDoneTask(index:number){
    this.doneList.splice(index,1);
 }
  AddTask(){
    this.todoList.push({
      description:this.todoForm.value.item,
      done:false
    })
    this.todoForm.reset();
  }

}
