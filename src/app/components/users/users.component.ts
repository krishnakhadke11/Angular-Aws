import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';

export interface User {
  id: string;       // Ensure these fields are present in your response
  fname: string;
  lname: string;
  address: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule,FormsModule,MatButtonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']  // Fix typo: use 'styleUrls' instead of 'styleUrl'
})
export class UsersComponent implements OnInit {
  data : User[] = [
    {
      id : "100",
      fname : "Krishna",
      lname : "Khadke",
      address : "USA"
    },
    {
      id : "100",
      fname : "Krishna",
      lname : "Khadke",
      address : "USA"
    },
    {
      id : "100",
      fname : "Krishna",
      lname : "Khadke",
      address : "USA"
    },
    {
      id : "100",
      fname : "Krishna",
      lname : "Khadke",
      address : "USA"
    },
  ]
  dataSource = new MatTableDataSource<User>();  // Use MatTableDataSource for better functionality
  displayedColumns: string[] = ['id', 'fname', 'lname', 'address','actions'];

  readonly dialog = inject(MatDialog);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers()
    // this.dataSource.data = this.data
  }

  openDialog(user : any): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent,{
      data : {id : user.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.userService.editUser(result).subscribe(res =>{
          console.log(res); 
          this.getUsers();
        })
      }
    });
  }

  getUsers(){
    this.userService.getUsers().subscribe((res) => {
      this.dataSource.data = res.users;  // Set data on the MatTableDataSource
      console.log(res);
    });
  }

  onDelete(id : any){
    this.userService.deleteUser(id).subscribe((res) =>{
      console.log(res);
      this.getUsers();
    })
  }
}
