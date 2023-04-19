import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { saveAs } from 'file-saver';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { MatIconModule } from '@angular/material/icon';




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  data: any[] = [];
  currentPage = 1;
  totalPages = 1;
  perPage = 3;
  imageData: string;
  toast_chips: any[];
  inputs: any
  toasts: any[] = [];
  userId: any  = ''
  pageNumbers: number[] = [];

  private apiURL = 'http://127.0.0.1:8040/delete/id';

  constructor(private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private location: Location // add this line


    ) {
      console.log('UpdateProfileComponent created');

     }

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        const page = params['page'] ? parseInt(params['page'], 10) : 1;
        this.loadData(page);
        this.userId = localStorage.getItem('user_id'); // Get user_id from local storage

     
    })}

    getImgUrl(img: string): SafeUrl {
      const dataUrl = `data:image/jpeg;base64,${img}`;
      return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
    }
    loadData(page: number) {
      this.currentPage = page;

      const token = localStorage.getItem('Authorization');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    

  
      const params = new HttpParams()
        .set('page', this.currentPage.toString())
        .set('per_page', this.perPage.toString());
  
      this.httpClient.get<any>('http://127.0.0.1:8040/MyToast', { params, headers })
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

      handleResponse(response: any) {
        this.userId = response.user_id;
        this.toasts = response.data.reverse(); 
        console.log(this.toasts);
        this.totalPages = response.total_pages;
        this.toast_chips = JSON.parse(response.data[0].input);
        this.inputs = this.toasts.map(obj => JSON.parse(obj.input));
    
        this.toasts.forEach(obj => {
          obj.input = JSON.parse(obj.input);
          this.userId = obj.user_id;
        });
        // localStorage.setItem('user_id', this.userId);
        // this.userId = Number(localStorage.getItem('ID'));
    
        console.log("user id:", this.userId);
    
        console.log(typeof response.data);
        console.log("es", typeof this.toast_chips);
      }




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
openConfirmationDialog(id: number): void {
  const dialogRef = this.dialog.open(DialogComponent, {
    data: { message: 'Are you sure you want to delete this toast?' },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result === true) {
      this.deleteToast(id);
    }
  });
}
downloadQRCode(itemId: number) {
  const currentDomain = window.location.protocol + '//' + window.location.host;
  const detailsUrl = this.location.prepareExternalUrl(`/details/${itemId}`);
  const qrCodeUrl = `http://127.0.0.1:8040/generate_qr_code/${currentDomain}${detailsUrl}`;

  this.httpClient.get(qrCodeUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
    saveAs(blob, `QR_Code_${itemId}.png`);
  });
}


navigateToUpdate(toastId: number): void {
  console.log('navigateToUpdate called with id:', toastId);
  this.router.navigate(['/update', toastId]);
}}
