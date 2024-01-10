import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  userFormGroup: FormGroup;
  message: string = ""
  constructor(private serviceAut: LoginService, private fb: FormBuilder, private router: Router) {
    this.userFormGroup = this.fb.group({
      email: ['',],
      password: ['',],
    })
  }

  ngOnInit(): void { }

  connecter() {
    //console.log(this.userFormGroup.get('email')?.value);
    let userLog = this.userFormGroup.value;
    this.serviceAut.login(userLog).subscribe(response => {
      if (response.status) {
        let token = response.token;
        let user = response.user;
        this.serviceAut.authentificateUser(user, token).subscribe(rep => {
          if (user.role === "resp") {
            this.router.navigateByUrl("/cour");
          } if (user.role === "prof") {
            this.router.navigateByUrl("/prof")
          }if (user.role === 'attache') {
            this.router.navigateByUrl("attache")
          }

        })
      } else {
        this.router.navigateByUrl("");
      }
    }, error => {
      console.error(error.error.message);
      this.message = error.error.message

    })
  }
}
