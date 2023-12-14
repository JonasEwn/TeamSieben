import { Component } from '@angular/core';
import { map, of } from 'rxjs';
import { AuthCoreService } from './shared/auth-core/auth-core.service';
import { MenuBarItem } from './shared/components/menu-bar/menu-bar.interfaces';
import { Router } from '@angular/router';

// This component is the root component of the application.
// It is used in the index.html.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'My PortfolioItems';

  public menuItems: MenuBarItem[] = [
    {
      name: 'Portfolio',
      routePath: 'overview',
      visible: this.auth.isAuthenticated$(),
    },
    {
      name: 'Message List',
      routePath: 'message-list',
      visible: this.auth.isAuthenticated$(),
    },
    {
      name: 'Login',
      routePath: 'login',
      visible: this.auth
        .isAuthenticated$()
        .pipe(map((isAuthenticated: boolean) => !isAuthenticated)),
      highlighted: true,
      icon: 'login',
    },
    {
      name: 'Impressum',
      routePath: 'impressum',
    },
    //{name: '404', routePath: 'somewhatever',},
    {
      name: 'Logout',
      routePath: 'logout',
      visible: this.auth.isAuthenticated$(),
      highlighted: true,
      icon: 'logout',
    },
  ];constructor(private auth: AuthCoreService, private router: Router) {}

  ngOnInit() {
    this.checkLogin();
  }

  private checkLogin() {
    this.auth.isAuthenticated$().pipe(
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
