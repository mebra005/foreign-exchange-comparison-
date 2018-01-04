import { TransferwiseService } from './shared/services/fees/transferwise.service';
import { PaysendService } from './shared/services/fees/paysend.service';
import { SendwyreService } from './shared/services/fees/sendwyre.service';
import { WesternunionService } from './shared/services/fees/westernunion.service';
import { XoomService } from './shared/services/fees/xoom.service';
import { SharedmoneyService } from './shared/services/fees/sharedmoney.service';
import { RemitlyService } from './shared/services/fees/remitly.service';
import { OFXService } from './shared/services/fees/ofx.service';
import { MoneygramService } from './shared/services/fees/moneygram.service';
import { RouterModule } from '@angular/router';
import { MoniesService } from './shared/services/fees/monies.service';
import { RefCompanyService } from './shared/services/refCompany.service';
import { CompanyService } from './shared/services/company.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MedianService } from './shared/services/median.service';
import { StatisticsService } from './shared/services/statistics.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule.forRoot()
  ],
  providers: [RefCompanyService,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
