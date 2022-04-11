import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesDataService } from '../countries-data.service';
import { Countries } from '../countries/countries.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countryId!:string;
  country!:Countries;

  constructor(private route:ActivatedRoute, private countriesDataService:CountriesDataService) { 
    this.country = new Countries("","",0,[]);
  }
      
  ngOnInit(): void {
     console.log("_ngOnInit Start");
     this.countryId = this.route.snapshot.params["countryId"];
     this.getCountryFromServer();
   console.log("_ngOnInit End");
  }

  getCountryFromServer(){
    this.countriesDataService.getOneCountry(this.countryId).subscribe({
      next:(result)=>{
        this.country = result;

        console.log(result, this.country);
      },
      error:(err)=>{
        console.log("Find and error",err);
      },
      complete:()=>{
        console.log("Get All countries");
      }

    })
  }

  add(result:any){
    console.log("add callback", result);
    this.getCountryFromServer();    
  }
}
