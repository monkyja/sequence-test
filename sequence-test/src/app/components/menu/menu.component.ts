import { Component, inject } from '@angular/core';
import { AppStore } from '@app/app.store';
import { TranslocoPipe } from '@jsverse/transloco';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';
import { ROUTES } from '@const/routes';

@Component({
  selector: 'app-menu',
  imports: [
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    TranslocoPipe,
    RouterLink
  ],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  appStore = inject(AppStore);

  ROUTES = ROUTES;
}
