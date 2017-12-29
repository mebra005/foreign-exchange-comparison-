import { Injectable } from '@angular/core';
import { CompanyService } from '../company.service';
import { RefCompanyService } from '../refCompany.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import UserInputs from '../../models/userInputs.model';
import Statistics from '../../models/statistics.model';

@Injectable()
export class SharedmoneyService {

    api_url = 'http://localhost:3000';
    CompanyUrl = `${this.api_url}/api/stats/sharedmoney`;

    constructor(
        private http: HttpClient
    ) { }



    getStatistic(userInputs: UserInputs): Observable<Statistics> {
        return this.http.post<Statistics>(`${this.CompanyUrl}`, userInputs);
    }

}
