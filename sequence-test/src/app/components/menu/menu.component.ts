import { Component, inject } from '@angular/core';
import { AppStore } from '@app/app.store';
import { TranslocoPipe } from '@jsverse/transloco';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-menu',
  imports: [NzLayoutModule, NzMenuModule, NzIconModule, TranslocoPipe],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  appStore = inject(AppStore);
}
