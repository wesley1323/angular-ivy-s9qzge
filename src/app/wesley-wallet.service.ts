import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface BitCoinRateUSD {
  bpi: {
    USD: {
      rate_float: number;
    };
    BRL: {
      rate_float: number;
    };
  };
}

interface BitCoinRateEUR {
  bpi: {
    EUR: {
      rate_float: number;
    };
  };
}

@Injectable()
export class WesleyWalletService {
  bitCoinRatesUSD: Array<BitCoinRateUSD> = [];
  bitCoinRatesEUR: Array<BitCoinRateEUR> = [];
  

  private saldo = 0;
  private estadoDolar: boolean = null;
  private estadoReal: boolean = null;

  constructor(private http: HttpClient) {
    this.atualizarValores();
  }

  atualizarValorDolar() {
    this.http
      .get<BitCoinRateUSD>(
        'https://api.coindesk.com/v1/bpi/currentprice/BRL.json'
      )
      .subscribe((data) => {
        if (this.bitCoinRatesUSD.length == 0) {
          this.bitCoinRatesUSD.push(data);
        }

        if (
          this.compararValores(
            this.bitCoinRatesUSD[this.bitCoinRatesUSD.length - 1].bpi.BRL
              .rate_float,
            data.bpi.BRL.rate_float
          ) != 0 ||
          this.compararValores(
            this.bitCoinRatesUSD[this.bitCoinRatesUSD.length - 1].bpi.USD
              .rate_float,
            data.bpi.USD.rate_float
          ) != 0
        ) {
          if (
            this.compararValores(
              this.bitCoinRatesUSD[this.bitCoinRatesUSD.length - 1].bpi.BRL
                .rate_float,
              data.bpi.BRL.rate_float
            ) == 1
          ) {
            this.estadoReal = true;
          } else if (
            this.compararValores(
              this.bitCoinRatesUSD[this.bitCoinRatesUSD.length - 1].bpi.BRL
                .rate_float,
              data.bpi.BRL.rate_float
            ) == 2
          ) {
            this.estadoReal = false;
          }

          if (
            this.compararValores(
              this.bitCoinRatesUSD[this.bitCoinRatesUSD.length - 1].bpi.USD
                .rate_float,
              data.bpi.USD.rate_float
            ) == 1
          ) {
            this.estadoDolar = true;
          } else if (
            this.compararValores(
              this.bitCoinRatesUSD[this.bitCoinRatesUSD.length - 1].bpi.USD
                .rate_float,
              data.bpi.USD.rate_float
            ) == 2
          ) {
            this.estadoDolar = false;
          }
          this.bitCoinRatesUSD.push(data);
        }
      });
  }

  atualizarValorEuro() {
    this.http
      .get<BitCoinRateEUR>(
        'https://api.coindesk.com/v1/bpi/currentprice/EUR.json'
      )
      .subscribe((data) => {
        if (this.bitCoinRatesEUR.length == 0) {
          this.bitCoinRatesEUR.push(data);
        }

        if (
          this.compararValores(
            this.bitCoinRatesEUR[this.bitCoinRatesEUR.length - 1].bpi.EUR
              .rate_float,
            data.bpi.EUR.rate_float
          ) != 0
        ) {
          this.bitCoinRatesEUR.push(data);
        }
      });
  }

  atualizarValores() {
    setInterval(() => {
      this.atualizarValorDolar();
      this.atualizarValorEuro();
    }, 5000);
  }

  compararValores(valorAnt: number, valorNovo: number) {
    if (valorAnt != valorNovo) {
      if (valorNovo > valorAnt) {
        return 1;
      } else {
        return 2;
      }
    } else {
      return 0;
    }
  }

  //funções de wallet
  depositarBitcoin(valor: number) {
    if (valor > 0) {
      this.saldo += valor;
    }
  }

  sacarBitcoin(valor: number) {
    if (valor <= this.saldo) {
      this.saldo = this.saldo - valor;
    }
  }

  getSaldo() {
    return this.saldo;
  }

  getDolar() {
    if (this.bitCoinRatesUSD.length > 0) {
      return (
        this.getSaldo() *
        this.bitCoinRatesUSD[this.bitCoinRatesUSD.length - 1].bpi.USD.rate_float
      ).toFixed(2);
    }
  }

  getReal() {
    if (this.bitCoinRatesUSD.length > 0) {
      return (
        this.getSaldo() *
        this.bitCoinRatesUSD[this.bitCoinRatesUSD.length - 1].bpi.BRL.rate_float
      ).toFixed(2);
    }
  }

  getBitcoin() {
    return this.bitCoinRatesUSD[this.bitCoinRatesUSD.length - 1].bpi.BRL
      .rate_float;
  }

  getEuro() {
    if (this.bitCoinRatesEUR.length > 0) {
      return (
        this.getSaldo() *
        this.bitCoinRatesEUR[this.bitCoinRatesEUR.length - 1].bpi.EUR.rate_float
      ).toFixed(2);
    }
  }

  getEstadoDolar() {
    return this.estadoDolar;
  }
  getEstadoReal() {
    return this.estadoReal;
  }
}
