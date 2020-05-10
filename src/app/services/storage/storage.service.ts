import {Injectable} from "@angular/core";
import {Router} from '@angular/router';
import {User} from "../../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localStorageService;
  private currentLoggedUser: User = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentLoggedUser = this.loadCurrentLoggedUser();
  }

  setCurrentLoggedUser(user: User): void {
    this.currentLoggedUser = user;
    this.localStorageService.setItem('currentUser', JSON.stringify(user));
  }

  loadCurrentLoggedUser(): User {
    var currentLoggedUser = <User>JSON.parse(this.localStorageService.getItem('currentUser'));
    return (currentLoggedUser) ? currentLoggedUser : null;
  }

  getCurrentLoggedUser(): User {
    return this.currentLoggedUser;
  }

  removeCurrentLoggedUser(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentLoggedUser = null;
  }

  isAuthenticated(): boolean {
    return (this.getCurrentLoggedUser() != null);
  };

  logout(): void {
    this.removeCurrentLoggedUser();
    this.router.navigate(['/']);
  }
}
