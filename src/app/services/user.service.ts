import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 url = 'https://7t40iuyedj.execute-api.us-east-1.amazonaws.com/Production'

  constructor(private http : HttpClient) { }

  getUsers() : Observable<any>{
    return this.http.get(this.url + '/users');
  }

  deleteUser(id : any){
    let params = new HttpParams().set('id', id);  
    console.log("id",id);
    console.log("params",params);
    return this.http.delete(this.url + '/user',{params});
  }

  editUser(updateObj : any){
    return this.http.put(this.url + '/user',updateObj)
  }
}
