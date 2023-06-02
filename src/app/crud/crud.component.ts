import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent {
  TaskArray : any[] = [];
 
  name: string ="";
  description: string ="";
 
  currentTaskID = "";
  isSaveDisabled = false;
  isUpdateDisabled = true;
 
  constructor(private http: HttpClient )
  {
    this.getAllTask();
 
  }
 
  saveRecords()
  {
  
    let bodyData = {
      "name" : this.name,
      "description" : this.description,
    };
 
    this.http.post("http://127.0.0.1:8000/task",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.getAllTask();
    });
  }
 
 
  getAllTask()
  {
    this.http.get("http://127.0.0.1:8000/task")
    .subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.TaskArray = resultData;
    });
  }
 
 
  setUpdate(data: any)
  {
   this.name = data.name;
   this.description = data.description;
   this.currentTaskID = data.id;
   this.isSaveDisabled = true;
   this.isUpdateDisabled = false;
  }
 
 
 
  UpdateRecords()
  {
    let bodyData = 
    {
      "name" : this.name,
      "description" : this.description,
    };
    
    this.http.put("http://127.0.0.1:8000/task/"+ this.currentTaskID , bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.name = '';
        this.description = '';
        this.getAllTask();
    });
    this.isSaveDisabled = false;
    this.isUpdateDisabled = true;
  }


  setDelete(data: any)
  {
    this.http.delete("http://127.0.0.1:8000/task/"+ data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.getAllTask();
    });
 
  }


}