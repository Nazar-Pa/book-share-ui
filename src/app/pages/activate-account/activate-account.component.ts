import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-activate-account',
  standalone: false,
  
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {

    message: string = '';
    isOkay: boolean = true;
    submitted: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthenticationService
    ){}

    onCodeCompleted(token: string) {
        this.confirmAccount(token);
    }

    confirmAccount(token: string) {
        this.authService.confirm({
            token
        }).subscribe({
            next: () => {
                this.message = 'Your account has been successfully activated.\nNow you can proceed to login.'
                this.isOkay = true;
            },
            error: () => {
                this.message = 'Token has been expired or invalid.'
                this.isOkay = false;
            }
        });
        this.submitted = true;
    }

    redirectToLogin() {
        this.router.navigate(['login']);
    }

}