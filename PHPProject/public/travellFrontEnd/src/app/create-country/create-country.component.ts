import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Countries } from '../countries/countries.component';
import { CountriesDataService } from '../countries-data.service';

@Component({
  selector: 'app-create-country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.css']
})
export class CreateCountryComponent implements OnInit {
 
  @ViewChild("countryForm")
  countryForm!:NgForm;
  country!:Countries;

  constructor(private dataservice:CountriesDataService) {
   }

  ngOnInit(): void {
    setTimeout(()=>{
      this.mainForm();
    },0)

  }

  mainForm(){
     this.country = new Countries("","", 0);
     this.countryForm.setValue(this.country);
  }

  onSubmit():void{
    this.dataservice.AddoneCountry(this.countryForm.value).subscribe({
     
      next:(result)=>{
        console.log(result);
        this.mainForm;
      },

      error:(err)=>{
        console.log("Find and error", err);
      },

      complete:()=>{
        console.log("Get All countries");
      }
    });
     console.log("_ngOnInit End");
  }
}
