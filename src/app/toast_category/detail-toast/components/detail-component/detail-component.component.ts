import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
interface ApiResponse {
  data: any[];
  total_pages: number;
}
@Component({
  selector: 'app-detail-component',
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.scss']
})
export class DetailComponentComponent implements OnInit {

  public printData: any = null;
  myForm: FormGroup | any;
  
  constructor( private httpClient:HttpClient,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    ) { }

  currentId:number = parseFloat(this.router.snapshot.params['id'])

  ngOnInit(): void {
    this.getData()

  }
  getData() {
    const id:number = this.currentId
    this.httpClient.get<ApiResponse>("http://127.0.0.1:8040/list").subscribe((res)=>{

      console.log(res)
      this.printData = res.data.find((item: any) => item.id === id)
  });
  

}
getImgUrl(img: string): SafeUrl {
  const dataUrl = `data:image/jpeg;base64,${img}`;
  return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
}

}
