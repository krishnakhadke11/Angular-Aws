import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-edit-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './user-edit-dialog.component.html',
  styleUrl: './user-edit-dialog.component.css'
})
export class UserEditDialogComponent {
  readonly data : any = inject<any>(MAT_DIALOG_DATA);
  private dialogRef : any = inject(MatDialogRef<UserEditDialogComponent>) 
  id : string = "1"
  updateKey : string = ""
  updateValue : string = ""

  constructor(){
    this.id =  this.data.id
  }

  createUpdateObj() {
    return {
      id: this.id,
      updateKey: this.updateKey,
      updateValue: this.updateValue
    };
  }

  // Method to handle the update action
  onUpdate() {
    const updateObj = this.createUpdateObj();
    this.dialogRef.close(updateObj); // Close the dialog and pass the update object
  }
}
