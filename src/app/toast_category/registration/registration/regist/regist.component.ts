import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit {

  signupForm : FormGroup | any;
  public f = ''
  public sendSignupform: any = ""

  constructor(private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService

    ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username:["", Validators.required],
        email:["", [Validators.required, Validators.email]],
        password:["", [Validators.required]]
      }
    )
  }


 
  signUp(form: FormGroup){
    console.log(form.value)
    this.sendSignupform = form.value
    this.f = form.value.Text
 
    this.authService.registerUser(this.sendSignupform).subscribe((res)=>{
      alert("registrer succsesfully")
      this.router.navigateByUrl('/login')
      console.log(res)
      this.signupForm.reset()
      console.log(form)

  },(err) =>{
    alert("login failed: " + err.statusText + ". try again")
    this.signupForm.reset()
    console.log(err)


  })


  
  }


}

















  // signUp(form: FormGroup){
  //   console.log(form.value)
  //   this.sendSignupform = form.value
  //   this.f = form.value.Text
  //   this.httpClient.post("http://127.0.0.1:8041/registration", this.sendSignupform).subscribe((res)=> {
  //     alert("registrer succsesfully")
  //     this.router.navigateByUrl('/login')

  //     console.log(res)
  //     this.signupForm.reset()
  // })


  
  // }