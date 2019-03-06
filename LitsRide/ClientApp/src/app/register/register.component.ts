import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
/** register component*/
export class RegisterComponent {
    /** register ctor */
  signUpForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required)
  })

  /** signup ctor */
  constructor(private translate: TranslateService, private userService: UserService) {
    translate.use(localStorage.getItem('lang') !== null || localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en');

  }
  get repeatPassword() {
    
    return this.signUpForm.get('repeatPassword') as FormControl;
  }

  get fullName() {
    return this.signUpForm.get('fullName') as FormControl;
  }


  get username() {
    return this.signUpForm.get('username') as FormControl;
  }

  get password() {
    return this.signUpForm.get('password') as FormControl;
  }

  get email() {
    return this.signUpForm.get('email') as FormControl;
  }

  registerNewUser() {
    this.userService
  }
}
