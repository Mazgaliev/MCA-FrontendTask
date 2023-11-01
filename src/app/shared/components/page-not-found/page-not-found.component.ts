import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  error: any;
  constructor(private readonly activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.error = this.activatedRoute.snapshot.paramMap.get('error');
  }
}
