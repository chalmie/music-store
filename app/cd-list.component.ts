import { Component, EventEmitter } from 'angular2/core';
import { DisplayCdComponent } from './cd-display.component';
import { CD } from './cd.model';
import { NewCdComponent } from './new-cd.component';
import { EditCdComponent } from './edit-cd.component';
import { ArtistPipe } from './artist.pipe';

@Component({
  selector: 'cd-list',
  inputs: ['cdList'],
  outputs: ['onCdSelect'],
  pipes: [ArtistPipe],
  directives: [DisplayCdComponent, NewCdComponent, EditCdComponent],
  template:`
  <select (change)="onChange($event.target.value)" class="filter">
    <option value="none">Show All</option>
    <option *ngFor="#currentCD of cdList" value="{{currentCD.artist}}">{{currentCD.artist}}</option>
  </select>
  <cd-display *ngFor="#currentCD of cdList | artist:artistFilter"
    (click)="cdClicked(currentCD)"
    [class.selected]="currentCD === selectedCD"
    [cd]="currentCD">
  </cd-display>
  <new-cd (onSubmitNewCD)="createCD($event)">
  </new-cd><br>
  <edit-cd
    *ngIf="selectedCD"
    [cd]="selectedCD"
    >
  </edit-cd>
  `
})
export class CdListComponent {
  public cdList: CD[];
  public onCdSelect: EventEmitter<CD>
  public selectedCD: CD;
  public artistFilter: string = 'none';
  constructor() {
    this.onCdSelect = new EventEmitter();
  }
  cdClicked(clickedCD: CD): void {
    this.selectedCD = clickedCD;
    this.onCdSelect.emit(clickedCD);
  }
  createCD(newCD: CD): void {
    this.cdList.push(
      new CD(newCD.name, newCD.artist, newCD.genre, newCD.price, this.cdList.length)
    );
  }
  onChange(filterOption) {
    this.artistFilter = filterOption;
  }
}
