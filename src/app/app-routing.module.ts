import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AuthcontainerComponent } from './authcontainer/authcontainer.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { OrdertrackComponent } from './ordertrack/ordertrack.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { HomelandingComponent } from './homelanding/homelanding.component';
import { MenuComponent } from './menu/menu.component';
import { MenuaddComponent } from './menuadd/menuadd.component';

const routes: Routes = [
  {
    path: 'budgetbites',
    title: 'budgetbites',

    component: AuthcontainerComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'login', // child route path
        title: 'Login',
        component: LoginComponent, // child route component that the router renders
      },
      {
        path: 'signup',
        title: 'Signup',
        component: SignupComponent, // another child route component that the router renders
      },
    ],
  },
  {
    path: 'home',
    title: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'orderhistory', // child route path
        title: 'Order History',

        component: OrderhistoryComponent, // child route component that the router renders
      },
      {
        path: 'ordertrack',
        title: 'Order Track',
        component: OrdertrackComponent, // another child route component that the router renders
      },
      {
        path: 'profile',
        title: 'profile',
        component: ProfileComponent, // another child route component that the router renders
      },
      {
        path: 'homelanding', // child route path
        title: 'Home',
        component: HomelandingComponent, // child route component that the router renders
      },
      {
        path: 'menu', // child route path
        title: 'Menu',
        component: MenuComponent, // child route component that the router renders
      },
      {
        path: 'menuadd', // child route path
        title: 'Menu Add',
        component: MenuaddComponent, // child route component that the router renders
      },
    ],
  },
  { path: '', redirectTo: '/budgetbites', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
