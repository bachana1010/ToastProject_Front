import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { NgEventBus } from 'ng-event-bus';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public User: any = '';
  requestOptions = {};

  constructor(
    public authservice: AuthService,
    private eventBus: NgEventBus,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.closeDropdown();
      }
    });
  }

  onSubmitUpdate() {
    this.User = localStorage.getItem('username');
  }

  closeDropdown() {
    const navbar = document.querySelector('.navbar-collapse');
    if (navbar && navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }
}
