import { Injectable } from '@angular/core';
import { MedianService } from '../median.service';
import { CompanyService } from '../company.service';
import RefCompany from '../../models/refCompany.model';
import Company from '../../models/Company.model';
import Median from '../../models/median.model';
import { RefCompanyService } from '../refCompany.service';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@Injectable()
export class MoniesService {

    // [temp] should be in database
    private maxAmount = 500;
    sourceOfFunding = ['Debit Card', 'Credit Card', 'Bank Account'];
    deliverymethod = ['Debit Card', 'Debit Card', 'Bank Account'];

    fees: number;
    trueCost: number;
    refRate: number;
    companies: Company[];
    company: Company;
    fxRate: number;
    transferValue: number;

    // Company name rate temp rate storage
    monies: Company;
    rate: number;

    constructor(private _refCompanyService: RefCompanyService, private _companyService: CompanyService, private _median: MedianService) { }


    getTrueCost(amount) {
        this.trueCost = amount * (4);
    }


    setMaxLimit(amount) {
        this.maxAmount = amount;
    }

    getMaxLimit() {
        return this.maxAmount;
    }

    maxLimit(amount: number) {
        if (amount > this.maxAmount) {
            return false;
        } else {
            return true;
        }
    }

    checkDeliveryMethod(delMethod: string) {
        for (let i = 0; i <= this.deliverymethod.length; i++) {
            if (delMethod === this.deliverymethod[i]) {
                return true;
            } else {
                return false;
            }
        }
    }

    checkSourceOfFunding(source: string) {
        for (let i = 0; i <= this.sourceOfFunding.length; i++) {
            if (source === this.sourceOfFunding[i]) {
                return true;
            } else {
                return false;
            }
        }
    }

    isValid(amount: number, delMethod: string, source: string) {
        if (this.maxLimit(amount) === true && this.checkDeliveryMethod(delMethod) && this.checkSourceOfFunding(source)) {
            return true;
        } else {
            return false;
        }
    }

    // get FX monies Rate
    getRate(company: Company) {
        this._companyService.findCompany(company._id)
            .subscribe(res =>
                this.monies = res
        );
        setTimeout(() => {
            console.log(this.monies['0'].rate);
            return this.rate = this.monies['0'].rate;
          }, 300);
    }

     theyGet(amount: number, company: Company) {
        this.getRate(company);
        setTimeout(() => {
            this.transferValue = this.rate * amount;
          }, 400);
    }


/*
    calculateTransferValue(amount: number, name: string) {
        return amount * this.getRate(name);
    }
*/
    calculateFee(amount: number, source: string, delMethod: string) {
        return this.fees = 4.99;
    }



}
