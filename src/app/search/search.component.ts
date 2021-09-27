import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { SwapiService } from './../core/services/swapi/swapi.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  @Output() searchClicked: EventEmitter<any> = new EventEmitter();

  searchTerm: string = '';

  constructor(
    private swapiService: SwapiService
  ) {}

  ngOnInit(): void {}

  search(): void {
    if (this.searchTerm) {
      this.searchClicked.emit(
        this.searchTerm
      );
    }
  }
}
