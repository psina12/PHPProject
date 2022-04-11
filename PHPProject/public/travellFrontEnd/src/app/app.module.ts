import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { DeleteComponent } from './delete/delete.component';
import { CountriesComponent } from './countries/countries.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CountryComponent } from './country/country.component';
import { CreateCountryComponent } from './create-country/create-country.component';
import { FormsModule } from '@angular/forms';
import { AddAttractionsComponent } from './add-attractions/add-attractions.component';
import { EditAttractionsComponent } from './edit-attractions/edit-attractions.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    CreateCountryComponent,
    DeleteComponent,
    CountriesComponent,
    CountryComponent,
    CreateCountryComponent,
    AddAttractionsComponent,
    EditAttractionsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:"",
        component:HomeComponent
      },
      {
        path:"countries",
        component:CountriesComponent
      },
      {
        path:"country/:countryId",
        component:CountryComponent
      },
      {
        path:"add",
        component:CreateCountryComponent
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
