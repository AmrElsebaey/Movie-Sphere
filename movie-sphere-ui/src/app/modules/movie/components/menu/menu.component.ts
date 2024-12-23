import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../../services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  userName: string = '';
  searchQuery: string = '';
  isAdmin: boolean = false;

  constructor(private router: Router, private tokenService: TokenService) {}

  ngOnInit(): void {
    if (this.tokenService.isTokenValid()) {
      this.userName = this.tokenService.name;
      this.isAdmin = this.tokenService.isAdmin();
    } else {
      this.userName = 'Guest';
      this.isAdmin = false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/'], {
        queryParams: { query: this.searchQuery },
      });
    }
  }
}
