import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonService } from '../person-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-person-create-update',
  templateUrl: './person-create-update.component.html',
  styleUrls: ['./person-create-update.component.css']
})
export class PersonCreateUpdateComponent implements OnInit{
  personForm :FormGroup;


  constructor(private _fb : FormBuilder, 
    private _personService : PersonService, 
    private _dialogRef :MatDialogRef<PersonCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
    ) {
    this.personForm = this._fb.group({
      personID : '',
      firstName : '',
      lastName : '',
      age: ' '
    })
  }

  ngOnInit(): void {
    console.log(this.data)
    this.personForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.personForm.valid){

      if(this.data){
        this._personService.updatePerson(this.data.personID, this.personForm.value).subscribe({
          next: (val: any) => {
            alert('Person updated successfully');
            this._dialogRef.close(true)
          },
          error : (err: any) => {
            console.log(err)
          }
        })
      }
      else{
        this._personService.addPerson(this.personForm.value).subscribe({
          next: (val: any) => {
            alert('Person added successfully');
            this._dialogRef.close(true)
          },
          error : (err: any) => {
            console.log(err)
          }
        })
      }

      
    }
  }
}

