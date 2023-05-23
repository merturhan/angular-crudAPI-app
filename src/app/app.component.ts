//import { Person } from './person';
import { PersonService } from './person-service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { response } from 'express';
import * as e from 'express';
import { MatDialog } from '@angular/material/dialog';
import { PersonCreateUpdateComponent } from './person-create-update/person-create-update.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  personID: number;
  firstName: string;
  lastName: string;
  age: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  displayedColumns: string[] = ['personID', 'firstName', 'lastName', 'age', 'action'];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _dialog : MatDialog, private _personService : PersonService){}

  ngOnInit(): void {
      this.getPersonList();
  }

  openCreateUpdatePersonForm(){
    const dialogReference = this._dialog.open(PersonCreateUpdateComponent);
    dialogReference.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getPersonList();
        }
      },
    });
  }

  getPersonList() {
    this._personService.getPersons().subscribe({
      next : (response) => {
        console.log(response)
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err)
      } 
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePerson(personID: number){
    this._personService.deletePerson(personID).subscribe({
      next: (response) => {
        alert("Person deleted successfully");
        this.getPersonList();
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }

  openUpdatePersonForm(data:any){
    const dialogReference = this._dialog.open(PersonCreateUpdateComponent, {
      data,
    });

    dialogReference.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getPersonList();
        }
      },
    });
  }

}
