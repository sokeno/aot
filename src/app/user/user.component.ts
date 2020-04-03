import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	pageTitle : string = "Users";

	users: any[] =
	[
		{
			"id":1,
			"username":"karis",
			"email":"peterkariukimutuura@gmail.com"
		},
		{
			"id":2,
			"username":"steve",
			"email":"steveokeno@mailinator.com"
		},
		{
			"id":3,
			"username":"woud",
			"email":"woud@mailinator.com"
		},
		{
			"id":4,
			"username":"kevin",
			"email":"kevin@mailinator.com"
		},
		{
			"id":5,
			"username":"okwara",
			"email":"okwara@mailinator.com"
		}
	];

  constructor() { }

  ngOnInit(): void {
  }

}
