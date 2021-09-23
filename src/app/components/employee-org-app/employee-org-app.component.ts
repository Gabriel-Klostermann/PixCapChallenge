import { Component, Inject } from '@angular/core';
import { IEmployeeOrgApp } from 'src/app/interfaces/iemployee-org-app';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-org-app',
  templateUrl: './employee-org-app.component.html',
  styleUrls: ['./employee-org-app.component.css']
})
export class EmployeeOrgAppComponent implements IEmployeeOrgApp {
  ceo: Employee;
  employeeFound: boolean = false;
  supervisorFound: boolean = false;
  movedEmployee!: Employee;
  newSupervisor!: Employee;
  movedEmployeeSupervisor!: Employee;
  undoArray: Employee[] = [];
  redoArray: Employee[] = [];

  constructor(@Inject(Object) instanceCeo: Employee) {
    this.ceo = instanceCeo;
  }

  //Moves an employee to another supervisor
  move(employeeUniqueID: number, supervisorUniqueID: number): void {
    //Save state of the JSON before moving employees for the undo feature
    this.saveUndoState(this.ceo);
    //If moving employee directly to under the CEO, set the new supervisor to the CEO to avoid additional iterations
    if (this.ceo.uniqueID == supervisorUniqueID) {
      this.newSupervisor = this.ceo;
      this.supervisorFound = true;
    }
    //Search for the employee and supervisors inside the JSON
    this.recursiveSearchEmployeeAndSupervisor(this.ceo.subordinates, employeeUniqueID, supervisorUniqueID);
    this.movedEmployeeSupervisor.name === this.movedEmployee.name ? this.movedEmployeeSupervisor = this.ceo : '';
    //Add the employee's subordinates to it's supervisor
    this.movedEmployee?.subordinates.forEach(subordinate => {
      this.movedEmployeeSupervisor?.subordinates.push(subordinate);
    });
    //Clear the employee's subordinates array
    this.movedEmployee.subordinates = [];
    //Remove the employee from it's original supervisor's subordinates list
    this.movedEmployeeSupervisor.subordinates.forEach((subordinate, index) => {
      if (subordinate.uniqueID === this.movedEmployee.uniqueID) {
        this.movedEmployeeSupervisor.subordinates.splice(index, 1);
      }
    })
    //Add the employee to the new supervisor's subordinates list
    this.newSupervisor?.subordinates.push(this.movedEmployee);
    //Save the stat of the JSON after the changes for the redo feature
    this.saveRedoState(this.ceo);
    //Reset control variables for the recursive search
    this.resetVariables();
  }
  //Undos the latest change, max undos possible = 10
  undo(): Employee {
    if (this.undoArray.length > 0) {
      this.saveRedoState(this.ceo);  
      this.ceo = this.undoArray[this.undoArray.length -1];
      this.undoArray.pop();      
    }
    return this.ceo;
  }
  //Redos the latest change, max undos possible = 10
  redo(): Employee {
    if (this.redoArray.length > 0) {
      this.saveUndoState(this.ceo);
      this.ceo = this.redoArray[this.redoArray.length -1];
      this.redoArray.pop();
    }
    return this.ceo
  }

  recursiveSearchEmployeeAndSupervisor(employeesArray: Employee[], employeeUniqueID: number, supervisorUniqueID: number, level: number = 0) {
    employeesArray.forEach(subordinate => {
      if (this.employeeFound && this.supervisorFound) {
        return;
      }
      if (employeeUniqueID == subordinate.uniqueID) {
        this.employeeFound = true;
        this.movedEmployee = subordinate;
        if (level === 0) {
          this.movedEmployeeSupervisor = this.movedEmployee;
        }
      }
      if( supervisorUniqueID == subordinate.uniqueID) {
        this.supervisorFound = true;
        this.newSupervisor = subordinate;
      }
      if (subordinate.subordinates.length > 0 && !this.employeeFound) {
        this.movedEmployeeSupervisor = subordinate;
      }
      this.recursiveSearchEmployeeAndSupervisor(subordinate.subordinates, employeeUniqueID, supervisorUniqueID, level +1);
    });
  }

  resetVariables() {
    this.employeeFound = false;
    this.supervisorFound = false;
  }

  saveUndoState(employeesArray: Employee) {
    if (this.undoArray.length > 10) {
      this.undoArray.shift();
    }
    this.undoArray.push(JSON.parse(JSON.stringify(employeesArray)));
  }

  saveRedoState(employeesArray: Employee) {
    if (this.redoArray.length > 10) {
      this.redoArray.shift();
    }
    this.redoArray.push(JSON.parse(JSON.stringify(employeesArray)));
  }
}
