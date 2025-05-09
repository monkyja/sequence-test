import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { MenuComponent } from '@components/menu/menu.component';
import { HeaderComponent } from '@components/header/header.component';
import { AppStore } from './app.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzIconModule, NzLayoutModule, MenuComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppStore],
})
export class AppComponent {
  appStore = inject(AppStore);

}
