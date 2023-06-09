import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { saveAs } from 'file-saver';
import { Location } from '@angular/common';

import { environment } from 'src/environments/environment';





import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-category-component',
  templateUrl: './category-component.component.html',
  styleUrls: ['./category-component.component.scss']
})
export class CategoryComponentComponent implements OnInit {
  endpoint = environment.apiUrl

  data: any[] = [];
  currentPage = 1;
  totalPages = 1;
  perPage = 3;
  imageData: string;
  fruits: any[];
  inputs: any
  toasts: any[] = [];
  userId: any  = ''
  pageNumbers: number[] = [];


  private apiURL = `${this.endpoint}/delete/id`;



  constructor(  private httpClient: HttpClient,
                private sanitizer: DomSanitizer,
                private route: ActivatedRoute,
                private router: Router,
                public dialog: MatDialog,
                private location: Location
                
                ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = params['page'] ? parseInt(params['page'], 10) : 1;
      this.loadData(page);
      console.log(`Loading data for page: ${this.currentPage}`);
console.log(`Params:`, params);
 
   
  })}


  downloadQRCode(itemId: number) {
    const currentDomain = window.location.protocol + '//' + window.location.host;
    const detailsUrl = this.location.prepareExternalUrl(`/details/${itemId}`);
    const qrCodeUrl = `${this.endpoint}/generate_qr_code/${currentDomain}${detailsUrl}`;
    
    this.httpClient.get(qrCodeUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
      saveAs(blob, `QR_Code_${itemId}.png`);
    });
  }



  getImgUrl(img: string): SafeUrl {
    const dataUrl = `data:image/jpeg;base64,${img}`;
    return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
  }


  loadData(page: number) {
    this.currentPage = page;

    const params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('per_page', this.perPage.toString());

    this.httpClient.get<any>(`${this.endpoint}/list`, { params })
      .subscribe(response => {
        this.handleResponse(response);
      });
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    })}

    previousPage() {
      if (this.currentPage > 1) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { page: this.currentPage - 1 },
          queryParamsHandling: 'merge',
        });
      }
    }

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { page: this.currentPage + 1 },
          queryParamsHandling: 'merge',
        });
      }
    }
  

    openConfirmationDialog(id: number): void {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: { message: 'Are you sure you want to delete this toast?' }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.deleteToast(id);
        }
      });
    }
  


  // delete functional

  deleteToast(id: any) {
    const token: string | null = localStorage.getItem('Authorization');
  
    // define the HTTP headers with the token
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
  
    // extract the ID from the toast object
    console.log("aidi", id);
    // send the DELETE request with the headers
    this.httpClient.delete(`${this.apiURL}/${id}`, { headers }).subscribe(
      () => {
        console.log(`Deleted toast with ID ${id}`);
        // remove the deleted toast from the array
        const index = this.toasts.findIndex(item => item.id === id);
        if (index !== -1) {
          this.toasts.splice(index, 1);
        }
  
        // If the last item on the page was deleted and it's not the first page
        if (this.toasts.length === 0 && this.currentPage !== 1) {
          this.previousPage();
        } else {
          this.loadData(this.currentPage);
        }
      },
      error => {
        console.error(error);
      }
    );
  }
  
  handleResponse(response: any) {
    this.userId = response.user_id;
    this.toasts = response.data;

    console.log(this.toasts);
    this.totalPages = response.total_pages;
    this.fruits = JSON.parse(response.data[0].input);
    this.inputs = this.toasts.map(obj => JSON.parse(obj.input));

    this.toasts.forEach(obj => {
      obj.input = JSON.parse(obj.input);
      this.userId = obj.user_id;
    });
    // localStorage.setItem('user_idaffaa', this.userId);
    this.userId = Number(localStorage.getItem('user_id'));


    console.log("user id:", this.userId);

    console.log(typeof response.data);
    console.log("es", typeof this.fruits);
  }


  navigateToUpdate(toastId: number): void {
    console.log('navigateToUpdate called with id:', toastId);
    this.router.navigate(['/update', toastId]);
  }
  
}
    

  



