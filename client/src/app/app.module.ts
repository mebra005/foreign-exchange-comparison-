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
  providers: [RefCompanyService, CompanyService, MedianService, MoniesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
