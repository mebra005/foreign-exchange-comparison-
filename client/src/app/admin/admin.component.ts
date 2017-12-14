import { MedianService } from './../shared/services/median.service';
import { CompanyService } from './../shared/services/company.service';
import { RefCompanyService } from './../shared/services/refCompany.service';
import { Component, OnInit, OnChanges, AfterViewInit, NgModule } from '@angular/core';
import RefCompany from './../shared/models/refCompany.model';
import Company from './../shared/models/Company.model';
import { Response } from '@angular/http';
import Median from './../shared/models/median.model';
import Currency from './../shared/models/currency.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  duplicateCompany: boolean;





  constructor(private _refCompanyService: RefCompanyService, private _companyService: CompanyService, private _median: MedianService) {

  }

  public newRefCompany: RefCompany = new RefCompany();
  public newCompany: Company = new Company();

  refCompaniesList: RefCompany[];
  editRefcompanies: RefCompany[] = [];

  companiesList: Company[];
  editcompanies: Company[] = [];

  medianRate: Median;

  currencyList: string[] = ['MXN', 'PHP'];
  selectedCurrency: string = this.currencyList[0];


  delTempList: string[] = [];
  sourceTempList: string[] = [];

  currentCurrency: number;
  newCurrency: number;
  duplicate: boolean;
  spinner: boolean;

  ngOnInit(): void {
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
    this.spinner = true;
    this._median.getMedian()
      .subscribe(median => {
        this.medianRate = median;
        console.log(median);
        this.spinner = false;
      });


  }


  createRefCompany() {

    // Check for duplicate
    for (const i of this.refCompaniesList) {
      if (this.newRefCompany.name.toUpperCase() === i.name.toUpperCase()) {
        this.duplicate = true;
        console.log('Duplicate reference Company is Not Allowed');
        return false;
      }
    }
    this._refCompanyService.createRefCompany(this.newRefCompany)
      .subscribe((res) => {
        this.refCompaniesList.push(res.data);
        this.newRefCompany = new RefCompany();
        console.log('Reference Company added successfully');
      });
  }

  editRefCompany(refCompany: RefCompany) {
    console.log(refCompany);
    if (this.refCompaniesList.includes(refCompany)) {
      if (!this.editRefcompanies.includes(refCompany)) {
        this.editRefcompanies.push(refCompany);
      } else {
        this.editRefcompanies.splice(this.editRefcompanies.indexOf(refCompany), 1);
        this._refCompanyService.editRefCompany(refCompany).subscribe(res => {
          console.log('Update Succesful');
        }, err => {
          this.editRefCompany(refCompany);
          console.error('Update Unsuccesful');
        });
      }
    }
  }


  submitRefCompany(event, refCompany: RefCompany) {
    if (event.keyCode === 13) {
      this.editRefCompany(refCompany);
      this.median();
    }
  }

  deleteRefCompany(refCompany: RefCompany) {
    this._refCompanyService.deleteRefCompany(refCompany._id).subscribe(res => {
      this.refCompaniesList.splice(this.refCompaniesList.indexOf(refCompany), 1);
    });
  }


  /* Company */
  createCompany() {

    // Check for duplicate
    for (const i of this.companiesList) {
      if (this.newCompany.name.toUpperCase() === i.name.toUpperCase()) {
        this.duplicateCompany = true;
        console.log('Duplicate Data Not Allowed');
        return false;
      }
    }


    this._companyService.createCompany(this.newCompany)
      .subscribe((res) => {
        this.companiesList.push(res.data);
        this.newCompany = new Company();
      });
  }

  editCompany(company: Company) {
    console.log(company);
    if (this.companiesList.includes(company)) {
      if (!this.editcompanies.includes(company)) {
        this.editcompanies.push(company);
      } else {
        this.editcompanies.splice(this.editcompanies.indexOf(company), 1);
        this._companyService.editCompany(company).subscribe(res => {
          console.log('Update Succesful');
        }, err => {
          this.editCompany(company);
          console.error('Update Unsuccesful');
        });
      }
    }
  }

  submitCompany(event, Company: Company) {
    if (event.keyCode === 13) {
      this.editCompany(Company);
    }
  }

  deleteCompany(company: Company) {
    this._companyService.deleteCompany(company._id).subscribe(res => {
      this.companiesList.splice(this.companiesList.indexOf(company), 1);
    });
  }

  median() {
    this.spinner = true;
    setTimeout(() => {
      this._median.getMedian()
        .subscribe(median => {
          this.medianRate = median;
          console.log(median);
          this.spinner = false;
        });
    }, 1000);

  }



  addDelMthd(method: string) {
    if (this.newCompany.deliveryMethod['0'] === '') {
      this.newCompany.deliveryMethod.shift();
    }
    this.newCompany.deliveryMethod.push(method);
  }

  addSource(source: string) {
    if (this.newCompany.source['0'] === '') {
      this.newCompany.source.shift();
    }
    this.newCompany.source.push(source);
  }

  // Alert
  close() {
    this.duplicate = false;
  }

}
