import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarcheComponent } from './features/marche/marche.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './features/home/home.component';
import { MarcaFormComponent } from './features/marca-form/marca-form.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './core/header/header.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { ModelliComponent } from './features/modelli/modelli.component';

@NgModule({
  declarations: [
    AppComponent,
    MarcheComponent,
    HomeComponent,
    MarcaFormComponent,
    HeaderComponent,
    NavbarComponent,
    ModelliComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
