import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WesleyCurrencyComponent } from './wesley-currency/wesley-currency.component';
import { WesleyWalletComponent } from './wesley-wallet/wesley-wallet.component';
import { WesleyWalletService } from './wesley-wallet.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'currency', component: WesleyCurrencyComponent },
      { path: 'wallet', component: WesleyWalletComponent },
    ]),
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    NavbarComponent,
    WesleyCurrencyComponent,
    WesleyWalletComponent,
  ],
  bootstrap: [AppComponent],
  providers: [WesleyWalletService],
})
export class AppModule {}
