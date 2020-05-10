import {Injectable} from '@angular/core';
import {User} from "../../interfaces/user";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000/users';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(protected http: HttpClient) {
  }

  /** Login **/
  login(email: string, password: string): Observable<User> {
    const url = `${this.url}/login`;
    return this.http.post<User>(url, {email, password}, this.httpOptions);
  }
}
