import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { SwapiService } from './../core/services/swapi/swapi.service';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit, OnChanges {

  @Input() url!: string;
  @Output() closeClicked: EventEmitter<any> = new EventEmitter();
  @Output() reloadClicked: EventEmitter<any> = new EventEmitter();

  details: any;
  group: any;
  loading: boolean = false;

  constructor(
    private swapiService: SwapiService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;
    this.group = this.getGroupFromUrl();

    this.fetchDetails();
  }

  close(): void {
    this.closeClicked.emit();
  }

  reload(link: string): void {
    this.reloadClicked.emit(link);
  }

  isList(data: any): boolean {
    return Array.isArray(data);
  }

  isNotEmpty(detail: any): boolean {
    let isArray = this.isList(detail);

    return ! isArray || (isArray && detail.length);
  }

  isString(text: string): boolean {
    return typeof(text) == 'string';
  }

  isUrl(text: string): boolean {
    return this.isString(text) && text.startsWith(environment.swapi);
  }

  parseTitle(title: string): string {
    return title.replace(/_/, ' ');
  }

  getGroupFromUrl(url: string = this.url): string {
    return url.split('/')[4];
  }

  fetchDetails(): void {
    this.swapiService.getData(this.url).subscribe(data => {
      this.details = data;
      this.loading = false;

      this.parseUrls();
    });
  }

  parseUrls(): void {
    for (let key in this.details) {
      let value = this.details[ key ];
      let isArray = this.isList(value);
      let isUrl = this.isUrl(value);

      if (isArray) {
        value.forEach((url: string, index: number) => {
          this.swapiService.getData(url).subscribe(result => {
            this.details[ key ][ index ] = {
              title: result.name || result.title,
              url: result.url,
            };
          });
        });
      }
      else if (isUrl) {
        this.swapiService.getData(value).subscribe(result => {
          this.details[ key ] = {
            title: result.name || result.title,
            url: result.url,
          };
        });
      }
    }
  }

  getGroupFields(group: string = this.group): any {
    let groupName: string = group;
    let fields: any = {
      films: [
        'title',
        'opening_crawl',
        'director',
        'producer',
        'release_date',
        'characters',
        'planets',
        'starships',
        'vehicles',
        'species',
      ],
      people: [
        'name',
        'height',
        'mass',
        'hair_color',
        'skin_color',
        'eye_color',
        'birth_year',
        'gender',
        'homeworld',
        'films',
        'species',
        'vehicles',
        'starships',
      ],
      planets: [
        'name',
        'rotation_period',
        'orbital_period',
        'diameter',
        'climate',
        'gravity',
        'terrain',
        'surface_water',
        'population',
        'residents',
        'films',
      ],
      species: [
        'name',
        'classification',
        'designation',
        'average_height',
        'skin_colors',
        'hair_colors',
        'eye_colors',
        'average_lifespan',
        'homeworld',
        'language',
        'people',
        'films',
      ],
      starships: [
        'name',
        'model',
        'manufacturer',
        'cost_in_credits',
        'length',
        'max_atmosphering_speed',
        'crew',
        'passengers',
        'cargo_capacity',
        'consumables',
        'hyperdrive_rating',
        'MGLT',
        'starship_class',
        'pilots',
        'films',
      ],
      vehicles: [
        'name',
        'model',
        'manufacturer',
        'cost_in_credits',
        'length',
        'max_atmosphering_speed',
        'crew',
        'passengers',
        'cargo_capacity',
        'consumables',
        'vehicle_class',
        'pilots',
        'films',
      ],
    };

    if (group == 'pilots' || group == 'residents') {
      groupName = 'people';
    }

    return fields[ groupName ] || groupName;
  };
}
