import { Component, inject } from '@angular/core';
import { AppStore } from '@app/app.store';
import { TranslocoPipe } from '@jsverse/transloco';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-header',
  imports: [TranslocoPipe, NzIconModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  appStore = inject(AppStore);

  toggleMenuCollapsed() {
    this.appStore.toggleMenuCollapsed();
  }
}
