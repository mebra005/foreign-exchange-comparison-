import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';

import RefCompany from './../shared/models/refCompany.model';
import Company from './../shared/models/Company.model';
import Median from './../shared/models/median.model';

import UserInputs from './../shared/models/userInputs.model';
import Statistics from './../shared/models/statistics.model';

import { MedianService } from './../shared/services/median.service';
import { CompanyService } from './../shared/services/company.service';
import { RefCompanyService } from './../shared/services/refCompany.service';

import { MoneygramService } from '../shared/services/fees/moneygram.service';
import { PaysendService } from '../shared/services/fees/paysend.service';
import { RemitlyService } from '../shared/services/fees/remitly.service';
import { SendwyreService } from '../shared/services/fees/sendwyre.service';
import { TransferwiseService } from '../shared/services/fees/transferwise.service';
import { WesternunionService } from '../shared/services/fees/westernunion.service';
import { XoomService } from './../shared/services/fees/xoom.service';
import { SharedmoneyService } from './../shared/services/fees/sharedmoney.service';
import { OFXService } from './../shared/services/fees/ofx.service';
import { MoniesService } from './../shared/services/fees/monies.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {

  amount: number;

  sourceItems: string[] = ['Source of funding...', 'Debit Card', 'Credit Card', 'Bank Account'];
  soureOfFunding: string = this.sourceItems[0];


  deliveryItems: string[] = ['Delivery Method...', 'Debit Card', 'Agent', 'Bank Account'];
  deliveryMethod: string = this.deliveryItems[0];


  timeItems: string[] = ['Delivery Time...', 'Same Day', 'Less than 2 days', 'Less than 3 days', 'Less than 4 days', 'Less than 5 days'];
  deliveryTime: string = this.timeItems[0];

  currencyItems: string[] = ['Currency...', 'MXN', 'PHP'];
  currency: string = this.currencyItems[0];

  medianrate: number;

  public userInputs: UserInputs = new UserInputs();
  public FXList: Statistics[] = [];
  public fx: Statistics = new Statistics();

  // transfer rate storage
  moniesFX: Statistics;
  moneygramFX: Statistics;
  ofxFX: Statistics;
  paysendFX: Statistics;
  remitlyFX: Statistics;
  sendwyreFX: Statistics;
  sharedmoneyFX: Statistics;
  transferwiseFX: Statistics;
  westernunionFX: Statistics;
  xoomFX: Statistics;

  refCompaniesList: RefCompany[];
  companiesList: Company[];
  medianRate: Median;

  constructor(
    private _refCompanyService: RefCompanyService,
    private _companyService: CompanyService,
    private _median: MedianService,
    private _moniesService: MoniesService,
    private _moneygramService: MoneygramService,
    private _ofxService: OFXService,
    private _paysendService: PaysendService,
    private _remitlyService: RemitlyService,
    private _sendwyreService: SendwyreService,
    private _sharedmoneyService: SharedmoneyService,
    private _transferwiseService: TransferwiseService,
    private _westernunionService: WesternunionService,
    private _xoomService: XoomService) { }



  ngOnInit() {
    this._refCompanyService.getRefCompanies()
      .subscribe(refCompanies => {
        this.refCompaniesList = refCompanies;
        console.log(refCompanies);
      });

    this._companyService.getCompanies()
      .subscribe(companies => {
        this.companiesList = companies;
        console.log(companies);
      });

    this._median.getMedian()
      .subscribe(median => {
        this.medianRate = median;
        console.log(median);
      });
  }





  // Call each companies service seperatly, add all the seperate responses(Only valid ones) to FXList array to be shown.
  calculateRates() {
    this.FXList = [];
    this.userInputs.source = this.soureOfFunding;
    this.userInputs.deliveryMethod = this.deliveryMethod;
    this.userInputs.deliveryTime = this.deliveryTime;
    this.userInputs.currency = this.currency;

    // Calls Moneygram Service
    this._moneygramService.getStatistic(this.userInputs)
      .subscribe(moneygramfx => {
        setTimeout(() => {
          this.moneygramFX = moneygramfx;
          if (this.moneygramFX != null) {
            this.FXList.push(moneygramfx);
            console.log(moneygramfx);
          }
        }, 500);
      });

    // Calls Monies Service
    this._moniesService.getStatistic(this.userInputs)
      .subscribe(moniesfx => {
        setTimeout(() => {
          this.moniesFX = moniesfx;
          if (this.moniesFX != null) {
            this.FXList.push(this.moniesFX);
            console.log(moniesfx);
          }
        }, 700);
      });

    // Calls ofx Service
    this._ofxService.getStatistic(this.userInputs)
      .subscribe(ofxfx => {
        setTimeout(() => {
          this.ofxFX = ofxfx;
          if (this.ofxFX != null) {
            this.FXList.push(this.ofxFX);
            console.log(ofxfx);
          }
        }, 900);
      });


    // Calls paysend Service
    this._paysendService.getStatistic(this.userInputs)
      .subscribe(paysendfx => {
        setTimeout(() => {
          this.paysendFX = paysendfx;
          if (this.paysendFX != null) {
            this.FXList.push(this.paysendFX);
            console.log(paysendfx);
          }
        }, 1100);
      });


    // Calls remitly Service
    this._remitlyService.getStatistic(this.userInputs)
      .subscribe(remitlyfx => {
        setTimeout(() => {
          this.remitlyFX = remitlyfx;
          if (this.remitlyFX != null) {
            this.FXList.push(this.remitlyFX);
            console.log(remitlyfx);
          }
        }, 1300);
      });

    // Calls sendwyre Service
    this._sendwyreService.getStatistic(this.userInputs)
      .subscribe(sendwyrefx => {
        setTimeout(() => {
          this.sendwyreFX = sendwyrefx;
          if (this.sendwyreFX != null) {
            this.FXList.push(this.sendwyreFX);
            console.log(sendwyrefx);
          }
        }, 1500);
      });


    // Calls sharedmoney Service
    this._sharedmoneyService.getStatistic(this.userInputs)
      .subscribe(sharedmoneyfx => {
        setTimeout(() => {
          this.sharedmoneyFX = sharedmoneyfx;
          if (this.sharedmoneyFX != null) {
            this.FXList.push(this.sharedmoneyFX);
            console.log(sharedmoneyfx);
          }
        }, 1700);
      });


    // Calls transferwise Service
    this._transferwiseService.getStatistic(this.userInputs)
      .subscribe(transferwisefx => {
        setTimeout(() => {
          this.transferwiseFX = transferwisefx;
          if (this.transferwiseFX != null) {
            this.FXList.push(this.transferwiseFX);
            console.log(transferwisefx);
          }
        }, 1900);
      });


    // Calls westernunion Service
    this._westernunionService.getStatistic(this.userInputs)
      .subscribe(westernunionfx => {
        setTimeout(() => {
          this.westernunionFX = westernunionfx;
          if (this.westernunionFX != null) {
            this.FXList.push(this.westernunionFX);
            console.log(westernunionfx);
          }
        }, 2100);
      });


    // Calls xoom Service
    this._xoomService.getStatistic(this.userInputs)
      .subscribe(xoomfx => {
        setTimeout(() => {
          this.xoomFX = xoomfx;
          if (this.xoomFX != null) {
            this.FXList.push(this.xoomFX);
            console.log(xoomfx);
          }
        }, 2300);
      });

  }
}
