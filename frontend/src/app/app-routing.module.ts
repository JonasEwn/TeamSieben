import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './views/detail/detail.component';
import { OverviewComponent } from './views/overview/overview.component';
import { ImpressumComponent } from './views/impressum/impressum.component';
import { HomeComponent } from './views/components/home/home.component';

// Route Definiton: More detail under  https://angular.io/api/router/Routes
// Details here:
// Routing is the mechanism by which users navigate through the application, typically via URLs.
// The Angular Router enables navigation from one view to the next as users perform application tasks.
// The Angular Router is an optional service that presents a particular component view for a given URL.
//
// Here's a breakdown of the code:
// The Routes object is an array of route configurations. Each route is an object with properties like path, component, children, etc.
// path is a string that specifies the URL path for the route.
// component is the component that Angular should use for this route.
// `children` is an array of route definitions for child routes.
// `redirectTo` is used to redirect from one path to another.
// `loadComponent` is a function that dynamically loads a component. This is useful for lazy loading components.
// The ** path is a wildcard that matches any URL. In this case, it's used to handle 404 errors.
//
// Here are some specific routes in the code:
// The `home` route loads the HomeComponent.
// The `overview` route loads the OverviewComponent and has a child route :id/detail that loads the DetailComponent.
// The `impressum` route loads the ImpressumComponent.
// The `somewhatever` and ** routes dynamically load the FourZeroFourComponent.
// The empty path '' redirects to home.
//
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'overview',
    component: OverviewComponent,
    children: [
      // Not used, but here for reference
      {
        path: ':id/detail',
        component: DetailComponent,
      },
    ],
  },
  {
    path: 'impressum',
    component: ImpressumComponent,
  },
  {
    // This is loading a standalone component `FourZeroFourComponent`
    path: 'somewhatever',
    loadComponent: () =>
      import(
        './shared/components/four-zero-four/four-zero-four.component'
      ).then((mod) => mod.FourZeroFourComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    // This is loading a standalone component `FourZeroFourComponent`
    path: '**',
    loadComponent: () =>
      import(
        './shared/components/four-zero-four/four-zero-four.component'
      ).then((mod) => mod.FourZeroFourComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
