import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

// decorator
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// life cycle event
export class AppComponent implements OnInit {
  title = 'Dating App';
  users : any;

  // Dependency injection
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    });
  }
}