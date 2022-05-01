import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
  // add encapsulation policy
  
})
export class MemberCardComponent implements OnInit {
  // props
  @Input() member: Member;

  constructor() { }

  ngOnInit(): void {
  }

}
