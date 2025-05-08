import { Component, inject } from '@angular/core';
import { AppStore } from '@app/app.store';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-header',
  imports: [TranslocoPipe],
  providers: [AppStore],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  appStore = inject(AppStore);

}
