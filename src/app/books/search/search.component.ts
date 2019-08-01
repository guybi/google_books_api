import { Component, OnInit, ElementRef, ViewChild, EventEmitter, OnDestroy, Output, Input } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, throttleTime, map} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  
  private searchSubscription: Subscription;
  private searchSubject = new Subject<string>();
  
  @Output() searchEvent = new EventEmitter<string>();
  @Input() searchText: string = '';
  
  @ViewChild('search', {static: true}) search: ElementRef;
  
  constructor() { }
  
  ngOnInit() {
    this.search.nativeElement.value = this.searchText;
    this.searchSubscription = this.searchSubject.pipe(
     debounceTime(500),distinctUntilChanged()).subscribe(
      (searchText) => {
        this.searchEvent.emit(searchText);
      });
  }
      
  onSearch($event) {
    const text: string = $event.target.value;
    if ($event.inputType == "insertText" || $event.code == "Enter") {
      this.searchSubject.next(text);
    } 
  }
  
  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
    