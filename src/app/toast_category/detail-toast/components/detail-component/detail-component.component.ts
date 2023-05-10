import { Component, OnInit, AfterViewInit} from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

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
  endpoint = environment.apiUrl

  public printData: any = null;
  myForm: FormGroup | any;
  comments: any[] = [];
  public newComment: string = '';


  
  constructor( private httpClient:HttpClient,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private auth: AuthService
    ) {
      this.router.params.subscribe(params => {
        this.currentId = +params['id']; // Convert the id to a number
        this.getDetailData();
      });
     }


  currentId:number = parseFloat(this.router.snapshot.params['id'])
  auth1 = this.auth.loggedIn()

  ngOnInit(): void {
    this.getComments();
    console.log(this.printData);


  }

  getDetailData() {

    this.httpClient
    .get<DetailResponse>(`${this.endpoint}/detail/id/${this.currentId}`)
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
  this.httpClient.get<any[]>(`${this.endpoint}/toasts/${this.currentId}/comments`).subscribe((res) => {
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

    this.httpClient.post<any>(`${this.endpoint}/toasts/${this.currentId}/comments`, payload,  { headers }).subscribe((res) => {
      this.comments.unshift(res);
    });
    this.newComment = ''
  }

getImgUrl(img: string): SafeUrl {
  const dataUrl = `data:image/jpeg;base64,${img}`;
  return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
}

toggleLikeContent(contentId: number) {
  const token = localStorage.getItem('Authorization');
// Set the headers with the token
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.httpClient.post<{likes: number, dislikes: number,status: string}>(`${this.endpoint}/toggle-like/${contentId}`, {}, {headers}).subscribe(response => {
    this.printData.likes = response.likes;
    this.printData.dislikes = response.dislikes;
    this.printData.status = response.status;

  });
}

toggleDislikeContent(contentId: number) {
  const token = localStorage.getItem('Authorization');
// Set the headers with the token
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  
this.httpClient.post<{likes: number, dislikes: number,status: string}>(`${this.endpoint}/toggle-dislike/${contentId}`, {}, {headers}).subscribe(response => {
    this.printData.likes = response.likes;
    this.printData.dislikes = response.dislikes;
    this.printData.status = response.status;

  });
}

}


