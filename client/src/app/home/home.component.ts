import { MoniesService } from './../shared/services/fees/monies.service';
import { MedianService } from './../shared/services/median.service';
import { CompanyService } from './../shared/services/company.service';
import { RefCompanyService } from './../shared/services/refCompany.service';
import RefCompany from './../shared/models/refCompany.model';
import Company from './../shared/models/Company.model';
import Median from './../shared/models/median.model';
import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {

  amount: number;

  sourceItems: string[] = ['Soure of funding...', 'Debit Card', 'Credit Card', 'Bank Account'];
  soureOfFunding: string = this.sourceItems[0];

  deliveryItems: string[] = ['Delivery Method...', 'Debit Card', 'Agent', 'Bank Account'];
  deliveryMethod: string = this.deliveryItems[0];


  timeItems: string[] = ['Delivery Time', 'Same Day', 'Less than 2 day', 'Less than 3 day', 'Less than 4 day', 'Less than 5 day'];
  deliveryTime: string = this.timeItems[0];

  currencyItems: string[] = ['Currency', 'MXN', 'PHP'];
  currency: string = this.currencyItems[0];

  medianrate: number;

  // transfer rate storage
  moniesfx: number;

  refCompaniesList: RefCompany[];
  companiesList: Company[];
  medianRate: Median;

  constructor(private _refCompanyService: RefCompanyService, private _companyService: CompanyService, private _median: MedianService,
    private _moniesService: MoniesService) { }

  /*
    Get Company Rate (CompanyService)(fee)
    Get Median Rate (RefCompany - Calculate)
    Get Basis Rate (RefCompany - Calculate)

    User: Amount
    User: Source, Delivery method, time

    Get: fee
    get: TrueCost
  */


  monies(amount, companyname) {
    this._moniesService.theyGet(amount, companyname);
    setTimeout(() => {
      return this.moniesfx = this._moniesService.transferValue;
    }, 1000);
  }

  calculateRates() {
  }



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

}
