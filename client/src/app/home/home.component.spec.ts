import { XoomService } from './../shared/services/fees/xoom.service';
import { WesternunionService } from './../shared/services/fees/westernunion.service';
import { TransferwiseService } from './../shared/services/fees/transferwise.service';
import { SendwyreService } from './../shared/services/fees/sendwyre.service';
import { SharedmoneyService } from './../shared/services/fees/sharedmoney.service';
import { PaysendService } from './../shared/services/fees/paysend.service';
import { RemitlyService } from './../shared/services/fees/remitly.service';
import { OFXService } from './../shared/services/fees/ofx.service';
import { MoneygramService } from './../shared/services/fees/moneygram.service';
import { MoniesService } from './../shared/services/fees/monies.service';
import { CompanyService } from './../shared/services/company.service';
import { RefCompanyService } from './../shared/services/refCompany.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { MedianService } from '../shared/services/median.service';
import { StatisticsService } from './../shared/services/statistics.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        RefCompanyService,
        CompanyService,
        MedianService,
        MoniesService,
        MoneygramService,
        OFXService,
        PaysendService,
        RemitlyService,
        SendwyreService,
        SharedmoneyService,
        TransferwiseService,
        WesternunionService,
        XoomService,
        StatisticsService,
        { provide: Router }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
