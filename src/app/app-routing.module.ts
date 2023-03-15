import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyloginComponent } from './user/mylogin/mylogin.component';
import { SignupComponent } from './user/signup/signup.component';
import { ActivationComponent } from './user/signup/activation.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MedicineDetailComponent } from './admin/medicine/medicine-detail/medicine-detail.component';
import { PackageDetailComponent } from './admin/medicine/package-detail/package-detail.component';
import {MedicineDashboardComponent} from './admin/medicine/medicine-dashboard/medicine-dashboard.component';
import {MedicineReportComponent} from './admin/medicine/medicine-report/medicine-report.component';
import { AgentCreateComponent } from './admin/agent/agent-create/agent-create.component';
import { MedicineListComponent } from './admin/medicine/medicine-list/medicine-list.component';
import { PackageListComponent } from './admin/medicine/package-list/package-list.component';
import { PackageReportComponent } from './admin/medicine/package-report/package-report.component';

import { NotificationComponent } from './admin/notification/notification.component';
import { MedicineCreateComponent } from './admin/medicine/medicine-create/medicine-create.component';
import { PackageCreateComponent } from './admin/medicine/package-create/package-create.component';
import { MedicineEditComponent } from './admin/medicine/medicine-edit/medicine-edit.component';
import { AgentListComponent } from './admin/agent/agent-list/agent-list.component';
import { AgentDetailComponent } from './admin/agent/agent-detail/agent-detail.component';
import { AgentEditComponent } from './admin/agent/agent-edit/agent-edit.component';
import { ProfileComponent } from './user/profile/profile.component';
import { PharmaComponent } from './admin/dashboard/pharma/pharma.component';
import { DistrubuterComponent } from './admin/dashboard/distrubuter/distrubuter.component';
import { WholesalerComponent } from './admin/dashboard/wholesaler/wholesaler.component';
import { ManufacturerComponent } from './admin/dashboard/manufacturer/manufacturer.component';
import { CreateUserComponent } from './admin/dashboard/create-user/create-user.component';
import { PackagetransporterComponent } from './admin/dashboard/packagetransporter/packagetransporter.component';
import { TransporterComponent } from './admin/dashboard/transporter/transporter.component';
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
import {MedicineDetailsDashboardComponent} from './admin/medicine/medicine-details-dashboard/medicine-details-dashboard.component';
import {SendwholesalerdashboardComponent} from './send/sendwholesalerdashboard/sendwholesalerdashboard.component';
import {SenddistributordashboardComponent} from './send/senddistributordashboard/senddistributordashboard.component';

const routes: Routes = [
   
    {path: '',   redirectTo: '/home', pathMatch: 'full'},
    {path: 'home',component: HomeComponent}, 
    {path: 'login',component: MyloginComponent}, 
    {path: 'signup',component: SignupComponent}, 
	{path: 'emailverification/:id',component: ActivationComponent},
    {path: 'profile',component: ProfileComponent},
    {path: 'dashboard',component: DashboardComponent}, 
    {path: 'createuser',component: CreateUserComponent}, 
    {path: 'manufacture',component: ManufacturerComponent}, 
    {path: 'wholesaler',component: WholesalerComponent},   
    {path: 'distrubuter',component: DistrubuterComponent},   
    {path: 'pharma',component: PharmaComponent},   
    {path: 'agent/request',component: AgentCreateComponent},
    {path: 'agent/list',component: AgentListComponent},
    {path: 'agent/detail',component: AgentDetailComponent},
    {path: 'agent/edit',component: AgentEditComponent},
    {path: 'medicine/details/:id',component: MedicineDetailComponent},
	{path: 'package/details/:id',component: PackageDetailComponent},
    {path: 'medicine/list',component: MedicineListComponent},
    {path: 'medicine/add',component: MedicineCreateComponent},
	{path: 'package/add',component: PackageCreateComponent}, 
	{path: 'package/list',component: PackageListComponent},
	{path: 'package/report',component: PackageReportComponent},
    {path: 'medicine/edit',component: MedicineEditComponent},
    {path: 'transporter',component: TransporterComponent},
	{path: 'packagetransporter',component: PackagetransporterComponent},
	{path: 'notification',component: NotificationComponent},
    {path: 'sendwholesaler',component: SendwholesalerComponent},
	{path: 'sendwholesalerreport',component: SendwholesalerreportComponent},
	{path: 'recievepackagewholesaler',component: RecievepackagewholesalerComponent},
	{path: 'recievepackagewholesalerreport',component: RecievepackagewholesalerreportComponent},
    {path: 'senddistributor',component: SenddistributorComponent},
	{path: 'senddistributorreport',component: SenddistributorreportComponent},
	{path: 'recievepackage',component: RecievepackagedistributorComponent},
	{path: 'recievepackagereport',component: RecievepackagedistributorreportComponent},
    {path: 'sendpharma',component: SendpharmaComponent},
	{path: 'sendpharmareport',component: SendpharmareportComponent},
	{path: 'recievepackagepharma',component: RecievepackagepharmaComponent},
	{path: 'recievepackagepharmareport',component: RecievepackagepharmareportComponent},
    {path: 'pharmaqr',component: PharmaqrComponent},
    {path: 'distributorqr',component: DistributorqrComponent},
    {path: 'wholesalerqr/:id',component: WholesalerqrComponent},
    {path: 'transporterqr',component: TransporterqrComponent},
    {path: 'distributordashboard',component: DistributordashboardComponent},
    {path: 'manufacturedashboard',component: ManufacturedashboardComponent},
    {path: 'pharmadashboard',component: PharmadashboardComponent},
    {path: 'transporterdashboard',component: TransporterdashboardComponent},
    {path: 'wholesalerdashboard',component: WholesalerdashboardComponent},
    {path: 'medicinedashboard',component: MedicineDashboardComponent},
	{path: 'medicinereport',component: MedicineReportComponent},
    {path: 'medicinedetailsdashboard/:id',component: MedicineDetailsDashboardComponent},
    {path: 'wholesalerdashboard1',component: SendwholesalerdashboardComponent},
    {path:'distributordashboard1', component:SenddistributordashboardComponent}

    
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
