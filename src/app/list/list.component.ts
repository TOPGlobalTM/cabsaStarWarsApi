import { Component, OnInit } from '@angular/core';

import { SwapiService } from './../core/services/swapi/swapi.service';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  detailUrl!: string;
  response: any;
  opened: boolean = false;
  loading: boolean = false;

  constructor(
    private swapiService: SwapiService
  ) {}

  ngOnInit(): void {
    this.fetchData(environment.swapi +'/people/');
  }

  fetchData(url: string): void {
    this.closeDetail();
    this.loading = true;

    this.swapiService.getData(url).subscribe(response => {
      this.response = response;
      this.loading = false;
    });
  }

  loadDetail(url: string): void {
    this.detailUrl = url;
    this.opened = true;
  }

  closeDetail(): void {
    this.opened = false;
  }

  reloadDetail(link: any): void {
    this.loadDetail(link);
  }

  search(term: string): void {
    this.fetchData(environment.swapi +'/people/?search='+ term);
  }
}
