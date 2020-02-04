import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';
import { of, forkJoin } from 'rxjs';
import { BusyService } from './core/services/busy.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  loading = true;

  constructor(
      private basketService: BasketService,
      private accountService: AccountService,
      private busyService: BusyService,
      private breadcrumbService: BreadcrumbService) {
      this.busyService.busy();
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const basketId = localStorage.getItem('basket_id');
    const sources = [
      token ? this.accountService.loadCurrentUser(token) : of(null),
      basketId ? this.basketService.getBasket(basketId) : of(null)
    ];
    forkJoin([
      ...sources
    ]).subscribe(() => { }, error => console.log(error), () => {
      console.log('app loaded');
      this.loading = false;
      this.busyService.idle();
    });
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.accountService.loadCurrentUser(token).subscribe(() => {
        console.log('loaded user');
      }, error => {
        console.log(error);
      });
    }
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('initialised basket');
      }, error => {
        console.log(error);
      });
    }
  }
}
