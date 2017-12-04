import { RefCompanyService } from './../shared/services/refCompany.service';
import { Component, OnInit } from '@angular/core';
import RefCompany from './../shared/models/refCompany.model';
import { Response } from '@angular/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private _refCompanyService: RefCompanyService) { }

  public newRefCompany: RefCompany = new RefCompany();

  refCompaniesList: RefCompany[];
  editRefcompanies: RefCompany[] = [];

  ngOnInit(): void {
    this._refCompanyService.getRefCompanies()
      .subscribe(refCompanies => {
        this.refCompaniesList = refCompanies;
        console.log(refCompanies);
      });
  }

  create() {
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


}
