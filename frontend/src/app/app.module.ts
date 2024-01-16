import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './shared/components/menu-bar/menu-bar.component';
import { OverviewComponent } from './views/overview/overview.component';
import { DetailComponent } from './views/detail/detail.component';
import { ImpressumComponent } from './views/impressum/impressum.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddItemDialogComponent } from './shared/components/add-item-dialog/add-item-dialog.component';
import { HomeComponent } from './views/components/home/home.component';
import {MatSortModule} from "@angular/material/sort";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS,HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './views/login/login.component';
import { AuthInterceptorService } from './shared/auth-core/auth-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './views/logout/logout.component';
import { MatTooltipModule } from '@angular/material/tooltip';
// This module is more or less the core-module of the application.
// In this case such a module is needed to declare the used components and all relevant modules at once.
// In difference to the AppModule you else could use the Standalone-components.
// This approach is represented by components in the "shared" folder.
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OverviewComponent,
    DetailComponent,
    ImpressumComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuBarComponent,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    AddItemDialogComponent,
    MatSortModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  },

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
