import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {StorageService} from "../../services/storage/storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: Boolean = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private storageService: StorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  /** User login **/
  login(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password;
      this.userService.login(email, password)
        .subscribe(user => {
          this.storageService.setCurrentLoggedUser(user);
          this.router.navigate(['']);
          window.location.reload();
        });
    }
  }
}
