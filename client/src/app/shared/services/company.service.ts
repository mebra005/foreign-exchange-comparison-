import Company from '../models/company.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class CompanyService {

    api_url = 'http://localhost:3000';
    CompanyUrl = `${this.api_url}/api/Companies`;

    constructor(
        private http: HttpClient
    ) { }


    // Create  Company, takes a Company Object
    createCompany(company: Company): Observable<any> {
        // returns the observable of http post request
        return this.http.post(`${this.CompanyUrl}`, company);
    }

    // Read  Company, takes no arguments
    getCompanies(): Observable<Company[]> {
        return this.http.get(this.CompanyUrl)
            .map(res => {
                // Maps the response object sent from the server
                return res['data'].docs as Company[];
            });
    }

    // Update company, takes a Company Object as parameter
    editCompany(company: Company) {
        const editUrl = `${this.CompanyUrl}`;
        // returns the observable of http put request
        return this.http.put(editUrl, company);
    }

    deleteCompany(id: string): any {
        // Delete the object by the id
        const deleteUrl = `${this.CompanyUrl}/${id}`;
        return this.http.delete(deleteUrl)
            .map(res => {
                return res;
            });
    }

    // Default Error handling method.
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
