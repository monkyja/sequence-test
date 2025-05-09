import { Component, inject, OnInit } from '@angular/core';
import { AppStore } from '@app/app.store';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  templateUrl: './homePage.component.html',
  imports: [TranslocoPipe],
})
export class HomePageComponent implements OnInit {
  constructor() {}

  appStore = inject(AppStore);

  ngOnInit() {
    this.appStore.setTitle('pages.home.pageTitle');
  }
}
