import { Component, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service'
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { NgEventBus } from 'ng-event-bus';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnChanges {
  loginForm: FormGroup | any;
  isAuthorized = false

  public f = ''
  public User: any  = ''
  public sendLoginform: any = ""

  constructor(private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private cookie: CookieService,
    private authService: AuthService,
    private dataservie: DataService,
    private eventBus: NgEventBus


    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: '',
      password: ""
      
    })
  }
  ngOnChanges(): void{
    this.User = this.dataservie.getLocalStorage("username")
     console.log('es iuseria', this.User)
   }

  onSubmit(form: FormGroup){
    this.sendLoginform = form.value
    
  this.authService.loginUser(this.sendLoginform).subscribe((res:any)=> 
  
  {

        alert("logined succsesfully")
        this.isAuthorized = true
        console.log('resiii',res)
        let InformationToken = res.token
        let user = res.user
        let userId = user.id; // Get user_id from the response
        let userName = user.username

        localStorage.setItem('Authorization',InformationToken)
        localStorage.setItem('user_id', userId); // Store user_id in local storage
        localStorage.setItem('username', userName); // Store user_id in local storage

        this.eventBus.cast('loginSuccessfully',user);
        

        this.router.navigateByUrl('/profile')
        this.loginForm.reset()
        this.setCookie(res.tokeni)


  
  },(err) =>{
    alert("login failed: " + err.statusText + ". try again")
    this.loginForm.reset()
    console.log(err)


  })

  }


  
  setCookie(token : any){
    this.cookie.set("UserToken", token)
  }
  
}



  


