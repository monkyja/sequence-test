import { Component, inject } from '@angular/core';
import { AppStore } from '@app/app.store';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-menu',
  imports: [NzLayoutModule, NzMenuModule],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  appStore = inject(AppStore);
}
