import { Component, OnInit } from '@angular/core';
import { EmployeeOrgAppComponent } from './components/employee-org-app/employee-org-app.component';
import { Employee } from './models/employee';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   title = 'PixCapChallenge';
   app: any;
   employeeUniqueID: number = 0;
   supervisorUniqueID: number = 0;
   showError: boolean = false;
   errorMessage: string = '';
   ceo: Employee = {
      "name": "Mark Zuckerberg",
      "uniqueID": 1,
      "subordinates": [
         {
            "name": "Sarah Donald",
            "uniqueID": 2,
            "subordinates": [
               {
                  "name": "Cassandra Reynolds",
                  "uniqueID": 6,
                  "subordinates": [
                     {
                        "name": "Mary Blue",
                        "uniqueID": 7,
                        "subordinates": [

                        ]
                     },
                     {
                        "name": "Bob Saget",
                        "uniqueID": 8,
                        "subordinates": [
                           {
                              "name": "Tina Teff",
                              "uniqueID": 9,
                              "subordinates": [
                                 {
                                    "name": "Will Turner",
                                    "uniqueID": 10,
                                    "subordinates": [

                                    ]
                                 }
                              ]
                           }
                        ]
                     }
                  ]
               }
            ]
         },
         {
            "name": "Tyler Simpson",
            "uniqueID": 3,
            "subordinates": [
               {
                  "name": "Harry Tobs",
                  "uniqueID": 11,
                  "subordinates": [
                     {
                        "name": "Thomas Brown",
                        "uniqueID": 12,
                        "subordinates": [

                        ]
                     },
                     {
                        "name": "George Carrey",
                        "uniqueID": 13,
                        "subordinates": [

                        ]
                     },
                     {
                        "name": "Gary Styles",
                        "uniqueID": 14,
                        "subordinates": [

                        ]
                     }
                  ]
               }
            ]
         },
         {
            "name": "Bruce Willis",
            "uniqueID": 4,
            "subordinates": [

            ]
         },
         {
            "name": "Georgina Flangy",
            "uniqueID": 5,
            "subordinates": [
               {
                  "name": "Sophie Turner",
                  "uniqueID": 15,
                  "subordinates": [

                  ]
               }
            ]
         }
      ]
   }

   //Instantiate a new Employee Org App
   ngOnInit(): void {
      this.app = new EmployeeOrgAppComponent(this.ceo);
   }

   updateEmployeeID(event: any) {
      this.employeeUniqueID = event.target.value
   }
   updateSupervisorID(event: any) {
      this.supervisorUniqueID = event.target.value
   }

   moveEmployee() {
      if (this.employeeUniqueID == this.ceo.uniqueID) {
         this.errorMessage = 'The CEO cannot be moved';
         this.showError = true;
      } else if (this.employeeUniqueID == this.supervisorUniqueID) {
         this.errorMessage = 'Supervisor and Employee IDs must be different'
         this.showError = true;
      }
      else {
         this.app.move(this.employeeUniqueID, this.supervisorUniqueID);
         this.showError = false;
      }
   }


   undo() {
      this.ceo = this.app.undo();
      this.showError = false;
   }

   redo() {
      this.ceo = this.app.redo();
      this.showError = false;
   }
}
