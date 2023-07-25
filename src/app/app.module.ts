import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { ProgressiveComponent } from './components/progressive/progressive.component';
import { DinamicComponent } from './components/dinamic/dinamic.component';
import { WithMessuresComponent } from './components/with-messures/with-messures.component';
import { AnglesComponent } from './components/angles/angles.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawerComponent,
    ProgressiveComponent,
    DinamicComponent,
    WithMessuresComponent,
    AnglesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
