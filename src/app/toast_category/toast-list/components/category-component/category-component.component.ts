import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';






import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-category-component',
  templateUrl: './category-component.component.html',
  styleUrls: ['./category-component.component.scss']
})
export class CategoryComponentComponent implements OnInit {
  data: any[] = [];
  currentPage = 1;
  totalPages = 1;
  perPage = 2;
  imageData: string;
  fruits: any[];
  inputs: any
  toasts: any[] = [];
  userId: any  = ''
  pageNumbers: number[] = [];


  private apiURL = 'http://127.0.0.1:8040/delete/id';



  constructor(  private httpClient: HttpClient,
                private sanitizer: DomSanitizer,
                private route: ActivatedRoute,
                private router: Router,
                public dialog: MatDialog 
                
                ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = params['page'] ? parseInt(params['page'], 10) : 1;
      this.loadData(page);
 
   
  })}

  getImgUrl(img: string): SafeUrl {
    const dataUrl = `data:image/jpeg;base64,${img}`;
    return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
  }


  loadData(page: number) {
    this.currentPage = page;

    const params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('per_page', this.perPage.toString());

    this.httpClient.get<any>('http://127.0.0.1:8040/list', { params })
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
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Delete Toast', message: 'Are you sure you want to delete this toast?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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
    });
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
    localStorage.setItem('user_id', this.userId);
    this.userId = Number(localStorage.getItem('ID'));

    console.log("user id:", this.userId);

    console.log(typeof response.data);
    console.log("es", typeof this.fruits);
  }

  openDeleteDialog(id: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this toast?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteToast(id);
      }
    });
  }
  
}
    

  