import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, ReactiveFormsModule],
  template: `
    <section>
      <form [formGroup]='searchForm'>
        <input type="text" placeholder="Filter by city" formControlName="searchText" />
        <button class="primary" type="button" (click)="submitSearch()">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location 
      *ngFor="let housingLocation of housingLocationList"
      [housingLocation]="housingLocation"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  // housingService: HousingService = inject(HousingService);

  searchForm = new FormGroup({
    searchText: new FormControl(''),
  });

  constructor(private housingService: HousingService) {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }

  submitSearch() {
    const searchText = this.searchForm.value.searchText;
    console.log('searchText: ', searchText);
    this.housingLocationList = this.housingService.getHousingLocationByName(
      searchText || ''
    );
  }
}
