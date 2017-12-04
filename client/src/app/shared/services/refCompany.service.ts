import RefCompany from '../models/refCompany.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class RefCompanyService {

    api_url = 'http://localhost:3000';
    refCompanyUrl = `${this.api_url}/api/refCompanies`;

    constructor(
        private http: HttpClient
    ) { }


    // Create Reference Company, takes a RefCompany Object
    createRefCompany(refcompany: RefCompany): Observable<any> {
        // returns the observable of http post request
        return this.http.post(`${this.refCompanyUrl}`, refcompany);
    }

    // Read Reference Company, takes no arguments
    getRefCompanies(): Observable<RefCompany[]> {
        return this.http.get(this.refCompanyUrl)
            .map(res => {
                // Maps the response object sent from the server
                return res['data'].docs as RefCompany[];
            });
    }

    // Update reference company, takes a RefCompany Object as parameter
    editRefCompany(refCompany: RefCompany) {
        const editUrl = `${this.refCompanyUrl}`;
        // returns the observable of http put request
        return this.http.put(editUrl, refCompany);
    }

    deleteRefCompany(id: string): any {
        // Delete the object by the id
        const deleteUrl = `${this.refCompanyUrl}/${id}`;
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
