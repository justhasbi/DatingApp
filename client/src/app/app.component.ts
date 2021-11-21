import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

// decorator
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// life cycle event
export class AppComponent implements OnInit {
  title = 'Dating App';

  // Dependency injection
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'))
    this.accountService.setCurrentUser(user);
  }
}