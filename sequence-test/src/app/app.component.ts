import { Component, inject, OnInit } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { AppStore } from './app.store';

@Component({
  selector: 'app-root',
  imports: [TranslocoPipe],
  providers: [AppStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  appStore = inject(AppStore);

  ngOnInit() {
    this.appStore.setTitle('appComponentPage');
  }
}
