import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { UserEffects } from './core/application/user/user.effects';
import { userReducer } from './core/application/user/user.reducer';
import { orderReducer } from './core/application/order/order.reducer';
import { provideNzI18n, en_US } from 'ng-zorro-antd/i18n';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { routes } from './app.routes';
import { MockInterceptor } from './infrastructure/interceptors/mock-interceptor.service';
import { provideAnimations } from '@angular/platform-browser/animations'; // Change this import
import { OrderEffects } from './core/application/order/order.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore({
      users: userReducer,
      orders: orderReducer
    }),
    provideEffects([UserEffects, OrderEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockInterceptor,
      multi: true
    },
    provideNzI18n(en_US),
    provideAnimations(),
    importProvidersFrom(
      NzModalModule,
    ),
  ]
};