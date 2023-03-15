import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MyloginComponent } from './user/mylogin/mylogin.component';
import { SignupComponent } from './user/signup/signup.component';
import { ActivationComponent } from './user/signup/activation.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MedicineDetailComponent } from './admin/medicine/medicine-detail/medicine-detail.component';
import { PackageDetailComponent } from './admin/medicine/package-detail/package-detail.component';
import { HeaderComponent } from './header/header.component';
import { AgentCreateComponent } from './admin/agent/agent-create/agent-create.component';
import { MedicineListComponent } from './admin/medicine/medicine-list/medicine-list.component';
import { PackageListComponent } from './admin/medicine/package-list/package-list.component';
import { PackageReportComponent } from './admin/medicine/package-report/package-report.component';

import { NotificationComponent } from './admin/notification/notification.component';
import { MedicineCreateComponent } from './admin/medicine/medicine-create/medicine-create.component';
import { PackageCreateComponent } from './admin/medicine/package-create/package-create.component';
import { MedicineEditComponent } from './admin/medicine/medicine-edit/medicine-edit.component';
import { AgentEditComponent } from './admin/agent/agent-edit/agent-edit.component';
import { AgentListComponent } from './admin/agent/agent-list/agent-list.component';
import { AgentDetailComponent } from './admin/agent/agent-detail/agent-detail.component';
import {MedicineDashboardComponent} from './admin/medicine/medicine-dashboard/medicine-dashboard.component';
import {MedicineReportComponent} from './admin/medicine/medicine-report/medicine-report.component';

import {MedicineDetailsDashboardComponent} from './admin/medicine/medicine-details-dashboard/medicine-details-dashboard.component';
import { ProfileComponent } from './user/profile/profile.component';

import { ManufacturerComponent } from './admin/dashboard/manufacturer/manufacturer.component';
import { WholesalerComponent } from './admin/dashboard/wholesaler/wholesaler.component';
import { DistrubuterComponent } from './admin/dashboard/distrubuter/distrubuter.component';
import { PharmaComponent } from './admin/dashboard/pharma/pharma.component';
import { PackagetransporterComponent } from './admin/dashboard/packagetransporter/packagetransporter.component';
import { TransporterComponent } from './admin/dashboard/transporter/transporter.component';
import { CreateUserComponent } from './admin/dashboard/create-user/create-user.component';
import { QRCodeModule } from 'angularx-qrcode';

import { QrCodeReader } from './qr-code-reader.service';
import {SendwholesalerComponent} from './send/sendwholesaler/sendwholesaler.component';
import {SendwholesalerreportComponent} from './send/sendwholesalerreport/sendwholesalerreport.component';


import {SenddistributorComponent} from './send/senddistributor/senddistributor.component';
import {SenddistributorreportComponent} from './send/senddistributorreport/senddistributorreport.component';
import {RecievepackagedistributorComponent} from './send/recievepackagedistributor/recievepackagedistributor.component';
import {RecievepackagedistributorreportComponent} from './send/recievepackagedistributorreport/recievepackagedistributorreport.component';
import {RecievepackagewholesalerComponent} from './send/recievepackagewholesaler/recievepackagewholesaler.component';
import {RecievepackagewholesalerreportComponent} from './send/recievepackagewholesalerreport/recievepackagewholesalerreport.component';
import {RecievepackagepharmaComponent} from './send/recievepackagepharma/recievepackagepharma.component';
import {RecievepackagepharmareportComponent} from './send/recievepackagepharmareport/recievepackagepharmareport.component';
import {SendpharmaComponent} from './send/sendpharma/sendpharma.component';
import {SendpharmareportComponent} from './send/sendpharmareport/sendpharmareport.component';
import {PharmaqrComponent} from  './admin/dashboard/qrcodescanner/pharmaqr/pharmaqr.component';
import {DistributorqrComponent} from  './admin/dashboard/qrcodescanner/distributorqr/distributorqr.component';
import {WholesalerqrComponent} from  './admin/dashboard/qrcodescanner/wholesalerqr/wholesalerqr.component';
import {TransporterqrComponent} from  './admin/dashboard/qrcodescanner/transporterqr/transporterqr.component';
import {DistributordashboardComponent} from  './admin/userrole/distributordashboard/distributordashboard.component';
import {ManufacturedashboardComponent} from  './admin/userrole/manufacturedashboard/manufacturedashboard.component';
import {PharmadashboardComponent} from  './admin/userrole/pharmadashboard/pharmadashboard.component';
import {TransporterdashboardComponent} from  './admin/userrole/transporterdashboard/transporterdashboard.component';
import {WholesalerdashboardComponent} from  './admin/userrole/wholesalerdashboard/wholesalerdashboard.component';
import {SendwholesalerdashboardComponent} from './send/sendwholesalerdashboard/sendwholesalerdashboard.component';
import {SenddistributordashboardComponent} from './send/senddistributordashboard/senddistributordashboard.component';


//import { ZXingScannerModule } from './admin/dashboard/modules/zxing-scanner/zxing-scanner.module';




@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent,
    MyloginComponent,
    SignupComponent, 
	ActivationComponent,
    ProfileComponent,  
    DashboardComponent,
    CreateUserComponent,
    ManufacturerComponent,
    WholesalerComponent,
    DistrubuterComponent,
    PharmaComponent,
    HeaderComponent,
    AgentCreateComponent,
    AgentEditComponent,
    AgentListComponent,
    AgentDetailComponent,
    MedicineListComponent,
	PackageListComponent,
	PackageReportComponent,
	NotificationComponent,
    MedicineCreateComponent,
	PackageCreateComponent,
    MedicineEditComponent,
    MedicineDetailComponent,
	PackageDetailComponent,
    ProfileComponent,
    TransporterComponent,
	PackagetransporterComponent,
    SendwholesalerComponent,
	SendwholesalerreportComponent,
    SenddistributorComponent,
	SenddistributorreportComponent,
	RecievepackagedistributorComponent,
	RecievepackagedistributorreportComponent,
	RecievepackagewholesalerComponent,
	RecievepackagewholesalerreportComponent,
	RecievepackagepharmaComponent,
	RecievepackagepharmareportComponent,
    SendpharmaComponent,
	SendpharmareportComponent,
    PharmaqrComponent,
    DistributorqrComponent,
    WholesalerqrComponent,
    TransporterqrComponent,
    DistributordashboardComponent,
    ManufacturedashboardComponent,
    PharmadashboardComponent,
    TransporterdashboardComponent,
    WholesalerdashboardComponent,
    MedicineDashboardComponent,
	MedicineReportComponent,
    MedicineDetailsDashboardComponent,
    SendwholesalerdashboardComponent,
    SenddistributordashboardComponent

    
    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    QRCodeModule,
    //ZXingScannerModule.forRoot()

  ],
  exports: [
    
  ],
  providers: [QrCodeReader],
  bootstrap: [AppComponent]
})
export class AppModule { }
