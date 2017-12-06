import { MedianService } from './../shared/services/median.service';
import { CompanyService } from './../shared/services/company.service';
import { RefCompanyService } from './../shared/services/refCompany.service';
import { Component, OnInit, OnChanges, AfterViewInit, NgModule } from '@angular/core';
import RefCompany from './../shared/models/refCompany.model';
import Company from './../shared/models/Company.model';
import { Response } from '@angular/http';
import Median from './../shared/models/median.model';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnChanges, AfterViewInit {

  constructor(private _refCompanyService: RefCompanyService, private _companyService: CompanyService, private _median: MedianService) { }

  public newRefCompany: RefCompany = new RefCompany();
  public newCompany: Company = new Company();

  refCompaniesList: RefCompany[];
  editRefcompanies: RefCompany[] = [];

  companiesList: Company[];
  editcompanies: Company[] = [];

  medianRate: Median;


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

    this._median.getMedian()
      .subscribe(median => {
        this.medianRate = median;
        console.log(median);
      });

  }




  ngOnChanges() {
    //  this.median();
  }

  ngAfterViewInit() {
    // this.median();
  }



  createRefCompany() {
    this._refCompanyService.createRefCompany(this.newRefCompany)
      .subscribe((res) => {
        this.refCompaniesList.push(res.data);
        this.newRefCompany = new RefCompany();
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
    }
  }

  deleteRefCompany(refCompany: RefCompany) {
    this._refCompanyService.deleteRefCompany(refCompany._id).subscribe(res => {
      this.refCompaniesList.splice(this.refCompaniesList.indexOf(refCompany), 1);
    });
  }


  /* Company */

  createCompany() {
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
    setTimeout(() => {
      this._median.getMedian()
        .subscribe(median => {
          this.medianRate = median;
          console.log(median);
        });
    }, 1000);

  }





}
