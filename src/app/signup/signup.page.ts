import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseAuthService } from '../firebase-auth.service';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signUpForm: FormGroup
  submitError: string | undefined;
  authRedirectResult: Subscription;

  validation_messages = {
    'name' : [
      {type: 'required', message: 'This field is required!'},
      {type: 'maxlength', message: 'Maximum of 50 characters only!'}
    ],
    'age' : [
      {type: 'required', message: 'This field is required!'},
      {type: 'max', message: 'Age must be 0 - 99 only!'},
    ],
    'gender' : [
      {type: 'required', message: 'This field is required!'},
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
  };

  constructor(
    public angularFire: AngularFireAuth, 
    public router: Router,
    private ngZone: NgZone,
    public authService: FirebaseAuthService,
    private toastController: ToastController,
    private dataService: DataService
  ) { 
    this.signUpForm = new FormGroup({
      'name': new FormControl('',Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ])),
      'gender': new FormControl('',Validators.required),
      'age': new FormControl('',Validators.compose([
        Validators.required,
        Validators.max(99)
    ])),
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
       'password': new FormControl('', Validators.compose([
        Validators.required,
         Validators.minLength(6)
      ]))
      });

      // Get firebase authentication redirect result invoken when using signInWithRedirect()
    // signInWithRedirect() is only used when client is in web but not desktop
    this.authRedirectResult = this.authService.getRedirectResult()
    .subscribe(result => {
      if (result.user) {
        this.redirectLoggedUserToProfilePage();
      } else if (result.error) {
        this.submitError = result.error;
      }
    });
  }

   // Once the auth provider finished the authentication flow, and the auth redirect completes,
  // redirect the user to the profile page
  redirectLoggedUserToProfilePage() {
    // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
    // That's why we need to wrap the router navigation call inside an ngZone wrapper
    this.ngZone.run(() => {
      this.router.navigate(['tabs-page/home']);
    });
  }

  userID: any
  signUpWithEmail() {
    this.authService.signUpWithEmail(this.signUpForm.value['email'], this.signUpForm.value['password'])
    .then(user => {
      // add info
      this.userID = user.user?.uid
      this.dataService.addUser(this.signUpForm.value['name'], this.signUpForm.value['age'], this.signUpForm.value['gender'], this.signUpForm.value['email'], this.userID)

      // navigate to user profile
      console.log('Account Created', user.user?.uid);
      this.router.navigate(["/login"]);
      this.presentToast("Account Created Succcessfully! Pleasse Login")
    })
    .catch((error: { code: string; }) => {
      if(error.code == "auth/email-already-in-use"){
        this.presentToast("Email is already used!")
      }
    });
  }
    async presentToast(errorMessage: string) {
      const toast = await this.toastController.create({
         message: errorMessage,
         duration: 3000,
         cssClass: 'custom-toast',
         position: 'top',
         buttons: [
          {
            text: 'Dismiss',
            role: 'cancel'
          }
        ],
      });
      await toast.present();
    }
      
    
ngOnInit() {
  }
}

