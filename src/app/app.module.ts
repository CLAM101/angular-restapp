import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { AuthcontainerComponent } from './authcontainer/authcontainer.component';
import { OrdertrackComponent } from './ordertrack/ordertrack.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './table/table.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { OrderhisttableComponent } from './orderhisttable/orderhisttable.component';
import { ProfileComponent } from './profile/profile.component';
import { StoreModule } from '@ngrx/store';
import { routeSwitchReducer } from './reducers';
import { HomelandingComponent } from './homelanding/homelanding.component';
import { MenuComponent } from './menu/menu.component';
import { MenuaddComponent } from './menuadd/menuadd.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SignupComponent,
    AuthcontainerComponent,
    OrdertrackComponent,
    OrderhistoryComponent,
    TableComponent,
    OrderhisttableComponent,
    ProfileComponent,
    HomelandingComponent,
    MenuComponent,
    MenuaddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    StoreModule.forRoot({ route: routeSwitchReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
