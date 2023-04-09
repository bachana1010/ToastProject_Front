import { Component, OnInit, AfterViewInit} from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';

interface ApiResponse {
  data: any[];
  total_pages: number;
}

interface DetailResponse {
  success: boolean;
  message?: string; // Optional message property
  data: any;
}

@Component({
  selector: 'app-detail-component',
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.scss']
})
export class DetailComponentComponent implements OnInit{

  public printData: any = null;
  myForm: FormGroup | any;
  comments: any[] = [];
  public newComment: string = '';


  
  constructor( private httpClient:HttpClient,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    ) {
      this.router.params.subscribe(params => {
        this.currentId = +params['id']; // Convert the id to a number
        this.getDetailData();
      });
     }


  currentId:number = parseFloat(this.router.snapshot.params['id'])

  ngOnInit(): void {
    this.getComments();
    console.log(this.printData);


  }

  getDetailData() {

    this.httpClient
    .get<DetailResponse>(`http://127.0.0.1:8040/detail/id/${this.currentId}`)
    .subscribe((res) => {
      console.log(res);
      if (res.success) {
        this.printData = res.data;
      } else {
        // Handle item not found or any other error message
        console.error(res.message);
      }
    });


}

getComments() {
  this.httpClient.get<any[]>(`http://127.0.0.1:8040/toasts/${this.currentId}/comments`).subscribe((res) => {
    this.comments = res;

  });}


  addComment(commentContent: string) {
    if (!commentContent) {
      return;
    }
  
    const payload = { content: commentContent };


    const token = localStorage.getItem('Authorization');
    console.log(token)
  // Set the headers with the token
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.httpClient.post<any>(`http://127.0.0.1:8040/toasts/${this.currentId}/comments`, payload,  { headers }).subscribe((res) => {
      this.comments.unshift(res);
    });
  }

getImgUrl(img: string): SafeUrl {
  const dataUrl = `data:image/jpeg;base64,${img}`;
  return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
}

}


