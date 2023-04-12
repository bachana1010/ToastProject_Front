import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';

import {map, startWith} from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

/**
 * @title Chips Autocomplete
 */

@Component({
  selector: 'app-update-toast',
  templateUrl: './update-toast.component.html',
  styleUrls: ['./update-toast.component.scss']
})
export class UpdateToastComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = [''];
  allFruits: string[] = ['samshoblo', 'mshvidoba', 'samich'];
  formData: FormData = new FormData();
  img_block = false
  user_id: any= ''

  myForm: FormGroup | any;
  public f = ''
  public sendform: any = ""
  submitted = false;
  url ='';
  selectedFile: any;

  errorMessage: string;
  public DataForUpdate: any = {};



  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;


  constructor(
    private fb: FormBuilder,
    private AddToast: DataService,
    private snackBar: MatSnackBar,
    private router: Router,
    private httpClient: HttpClient) { 
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
      );
    }

    add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
  
      // Add our fruit
      if (value) {
        this.fruits.push(value);
      }
  
      // Clear the input value
      event.chipInput!.clear();
  
      this.fruitCtrl.setValue(null);
    }
  
    remove(fruit: string): void {
      const index = this.fruits.indexOf(fruit);
  
      if (index >= 0) {
        this.fruits.splice(index, 1);
      }
    }
  
  
  
    selected(event: MatAutocompleteSelectedEvent): void {
      this.fruits.push(event.option.viewValue);
      this.fruitInput.nativeElement.value = '';
      this.fruitCtrl.setValue(null);
    }
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
    }
  
  ngOnInit(): void {
 

    this.getData()
    console.log("es", this.DataForUpdate)

    console.log("on init",this.fruits)

    this.myForm = this.fb.group({
      title: '',
      content: "",
      image: [null],
      

    })
    
  }
  onselectFile(e: any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
  
  
      reader.onload = (event:any)=>{
        this.url = event.target.result
        console.log(this.url)
      }


    }

    this.selectedFile = e.target.files[0];
    console.log("es faili ", this.selectedFile)
    
  
    this.img_block = true
  }
  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];

  }


  onSubmit(form: FormGroup){
    this.submitted = true
 
    this.sendform = form.value

    const uploadData = new FormData();
    uploadData.append('photo', this.selectedFile);

  const formData: FormData = new FormData();
    formData.append('photo', this.selectedFile, this.selectedFile.name);

    formData.append('sendform', this.sendform);

    this.user_id = localStorage.getItem('ID')

    if (this.user_id) {
    this.formData.set('photo', this.selectedFile);

    this.formData.set('data', JSON.stringify(this.sendform));
    this.formData.set('fruits', JSON.stringify(this.fruits));
    this.formData.set('user_id', JSON.stringify(this.user_id));




    
    this.AddToast.AddToast(this.formData).subscribe(
      (res) => {
        console.log(res);
        console.log(uploadData);
        console.log(this.sendform);
        this.myForm.reset();
        this.img_block = false;
        this.fruits = [''];

           // Show success toast
      this.snackBar.open('Successfully added!', 'Close', {
        duration: 3000,
        panelClass: 'success-snackbar',

      });

      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = 'You are not authorized to add toast.';
        } else {
          this.errorMessage = 'An error occurred.';
        }
  
        // Show error toast
        this.snackBar.open(this.errorMessage, 'Close', {
          duration: 4000,
          panelClass: 'error-snackbar',
        });
      }
      
    )} 
    
    else {
      // Show unauthorized error message
      this.errorMessage = 'You are not authorized to add toast.';
      this.snackBar.open(this.errorMessage, 'Close', {
        duration: 3000,
        panelClass: 'error-snackbar' ,

      });
  
 // Navigate to login route after 3-4 seconds
 setTimeout(() => {
  this.router.navigate(['login']);
}, 3200); // Change the duration to your preference
}

      
    
  
    
}   

getData() {
      // const id:number = this.currentId

      
      this.httpClient.get<any>('http://127.0.0.1:8040/list', {})
      .subscribe(res => {
        this.DataForUpdate = res.data.find((item: any) => item.id === 3)
        this.url = 'data:image/png;base64,' + this.DataForUpdate.img;

        const fruitsFromServer = JSON.parse(this.DataForUpdate.input);
        this.fruits = fruitsFromServer.filter((fruit: string) => fruit !== '');
        console.log("Fruits from server", this.fruits);
      });
    }   
}
