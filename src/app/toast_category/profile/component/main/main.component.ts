import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  updateForm: FormGroup | any ;
  info: any =''
  localstorageName = ''
  localstorageID = ''
  updateform_send = ''
  username: any  = ''
  requestOptions = {}
  public DataForUpdate: any = {};
  information = ''




  constructor(  
    private fb: FormBuilder,
      private cookie: CookieService,
    private httpClient: HttpClient,
    private authservice: AuthService,
    private dataservie: DataService
    ) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      username: '',
      email: '',
      password: ''
    })
    this.getInformation()
  }


  onSubmitUpdate(form: FormGroup){
    
    let auth_token1 = localStorage.getItem('Authorization')
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${auth_token1}`,
      });
  
    this.requestOptions = { headers: headers }
    console.log(typeof(this.requestOptions))
    

    this.httpClient.post('http://127.0.0.1:8040/update',form.value, this.requestOptions).subscribe((res)=> {
    this.updateForm.reset() 
    console.log(res)
    alert("updated succsesfully")

  },
    
    (err) =>{
      alert("incorect password: " + err.error + ". try again")
      console.log(err)  
      this.updateForm.reset()
  
  
    })

  }

  getInformation(): void{
    console.log(this.DataForUpdate)
    let auth_token = localStorage.getItem('Authorization')
    console.log(auth_token)
  
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${auth_token}`
      });
  
      const requestOptions = { headers: headers };
  

    this.authservice.me_user(requestOptions).subscribe((res:any)=> {
      this.info = res
      this.localstorageName = "username"
      this.dataservie.setLocalStorage( this.info.username,this.localstorageName)

      this.localstorageID = "ID"
      this.dataservie.setLocalStorage( this.info.id,this.localstorageID)
      console.log("es saxelia profilidan" , this.info.username)
      this.DataForUpdate = this.info




    })

    }

    setCookie(username : any){
      this.cookie.set("user", username)
    }

}
