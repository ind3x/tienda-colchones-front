import {Component} from '@angular/core';
import {StorageService} from "../../services/storage/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Tienda de Colchones';

  public authenticated: boolean = false;

  constructor(private storageService: StorageService) {
  }

  ngOnInit() {
      // Check if Add product form can be shown
    this.authenticated = this.storageService.isAuthenticated();
  }

  /** User logout **/
  logout(): void {
    this.storageService.logout();
    window.location.reload();
  }
}
