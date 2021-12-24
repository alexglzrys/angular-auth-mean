import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
    * {
      margin: 1rem;
    }
    button {
      outline: none !important;
      border: none;
      background: linear-gradient(90deg, rgba(96,207,220,1) 0%, rgba(190,52,218,1) 92%);
      color: white;
      border-radius: 5px;
      width: 100px;
      padding: 10px;
    }
    button:hover {
      cursor: pointer;
    }
    `
  ]
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    // Redireccionar al usuario al login
    this.router.navigateByUrl('/login');
  }

}
