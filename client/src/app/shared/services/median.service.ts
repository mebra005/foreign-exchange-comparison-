import { Injectable } from '@angular/core';
import { RefCompanyService } from './refCompany.service';
import RefCompany from '../models/refCompany.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import Median from '../models/median.model';

@Injectable()
export class MedianService {

    api_url = 'http://localhost:3000';
    CompanyUrl = `${this.api_url}/api/median`;

    constructor(
        private http: HttpClient
    ) { }


    // Read  Median, takes no arguments
    getMedian(): Observable<Median> {
        return this.http.get(this.CompanyUrl)
            .map(res => {
                // Maps the response object sent from the server
                return res as Median;
            });
    }
}

