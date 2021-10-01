import { Component, OnInit } from '@angular/core';
import { WesleyWalletService } from '../wesley-wallet.service';

@Component({
  selector: 'app-wesley-wallet',
  templateUrl: './wesley-wallet.component.html',
  styleUrls: ['./wesley-wallet.component.css'],
})
export class WesleyWalletComponent implements OnInit {
  constructor(public wallet: WesleyWalletService) {}

  ngOnInit() {}

  depositar(valor: string) {
    let calc: number;
    calc = parseFloat(valor) / this.wallet.getBitcoin();
    this.wallet.depositarBitcoin(calc);
  }
  sacar(valor: string) {
    let calc: number;
    calc = parseFloat(valor) / this.wallet.getBitcoin();
    this.wallet.sacarBitcoin(calc);
  }
}
