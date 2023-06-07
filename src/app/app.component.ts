import { Component,Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GyizerTodoApp';
  array:any=[];
  taskForm!: FormGroup;
  count:number=0;
  task=false;
  update=false;
  editv=false;
  updateId:any=0;

  constructor(public dialog: MatDialog) {}

  
  ngOnInit() {
    this.taskForm = new FormGroup({
      title: new FormControl('',Validators.required),
      description: new FormControl('', Validators.required)
    });

    
    // if(this.count==0){
    //   this.task=true;
    // }
    // else{
    //   this.task=false
    // }
  }


  addtask(taskForm: any){
    this.array.push(this.taskForm.value);
    console.log(this.array);
    this.taskForm.reset();
    this.count++;
  }

  info(){
    this.update=true;
  }



  edittask(i:number){
    this.taskForm.controls['title'].setValue(this.array[i].title);
    this.taskForm.controls['description'].setValue(this.array[i].description);
    this.updateId=i;
    this.update=false;
    this.editv=true;
    console.log(i);
    
  }
  updatetask(){
   this.array[this.updateId].title= this.taskForm.value.title;
   this.array[this.updateId].description=this.taskForm.value.description;
   this.editv=false;
   this.taskForm.reset()
  }

  openDialog() {
    console.log(this.array);
    console.log(this.count);
    
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        arr: this.array,
        index: this.updateId
      },
    }).afterClosed().subscribe(data=>{
      console.log(data.data.arr);
      this.array = data.data.arr;
      this.count = this.array.length;
      console.log(this.count);
  });
  }

}


@Component({
  selector: 'dialog-data-example-dialog',
  template: `<div>
               <h1 mat-dialog-title>Delete this task?</h1>
             </div>
             <div style="display:flex;justify-content:center;margin-bottom:1rem">
             <button style="margin-right:1rem" (click)="deletetask()">Yes</button>
             <button (click)="close()">No</button></div>`,
  standalone: true,
  imports: [MatDialogModule],
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<DialogDataExampleDialog>) {
    console.log(this.data.arr);
    console.log(this.data.index);
    
  }
  deletetask(){
    console.log(this.data.arr);
    this.data.arr.splice(this.data.index,1);
    console.log(this.data.arr);
    this.dialogRef.close({data:this.data});
}
close(){
  this.dialogRef.close({data:this.data});
}
}