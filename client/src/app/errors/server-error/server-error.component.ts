import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  error: any;
  // how to get data from navigateExtras
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    // using null safe to prevent error when route redirected to this server-error page
    this.error = navigation?.extras?.state?.error;
  }

  ngOnInit(): void {
  }

}
