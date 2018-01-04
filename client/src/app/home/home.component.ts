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
import { StatisticsService } from './../shared/services/statistics.service';


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

  statisticsFX: Statistics[] = [];
  refCompaniesList: RefCompany[];
  companiesList: Company[];
  medianRate: Median;

  showTable = false;

  constructor(
    private _refCompanyService: RefCompanyService,
    private _companyService: CompanyService,
    private _median: MedianService,
    private _statisticsService: StatisticsService) { }



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


  calculateRates() {
    this.showTable = true;
    this.userInputs.source = this.soureOfFunding;
    this.userInputs.deliveryMethod = this.deliveryMethod;
    this.userInputs.deliveryTime = this.deliveryTime;
    this.userInputs.currency = this.currency;

    this._statisticsService.getStatistic(this.userInputs)
      .subscribe(statisticsfx => {
        this.statisticsFX = statisticsfx;
        console.log(this.statisticsFX);
      });

  }

  reset() {
    this.showTable = false;
  }

}
