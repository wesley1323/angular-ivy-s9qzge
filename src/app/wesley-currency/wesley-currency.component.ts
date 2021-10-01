import { Component, OnInit } from '@angular/core';
import { WesleyWalletService } from '../wesley-wallet.service';
@Component({
  selector: 'app-wesley-currency',
  templateUrl: './wesley-currency.component.html',
  styleUrls: ['./wesley-currency.component.css'],
})
export class WesleyCurrencyComponent implements OnInit {
  constructor(public wallet: WesleyWalletService) {}

  ngOnInit() {}

  atualizarValores() {
    this.wallet.atualizarValores();
  }
}