import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { Register$Params } from '../../services/fn/authentication/register';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

    requestRequest: RegistrationRequest = {
        email: '',
        firstname: '',
        lastname: '',
        password: ''
    };
    errorMsg: Array<string> = [];

    constructor(
        private router: Router,
        private authService: AuthenticationService, 
    ){}

    register() {
        this.errorMsg = [];
        this.authService.register({body: this.requestRequest} as Register$Params)
            .subscribe({
                next: () => {
                    this.router.navigate(['activate-account'])
                },
                error: (err) => {
                    this.errorMsg = err.error.validationErrors
                }
            })
    }

    login() {
        this.router.navigate(['login'])
    }
}
