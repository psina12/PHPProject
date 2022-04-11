import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesDataService } from '../countries-data.service';

export class Attractions{
  _id!:string;
  name!:string;
  city!:string;
  pic_link!:string;
  constructor(name:string, city:string, pic_link:string){
    this.name=name;
    this.city=city;
    this.pic_link=pic_link;
  }
}

export class Countries {
  _id!:string;
  name!:string;
  population!:number;
  attractions!:Attractions[];
 
  constructor(_id:string, name:string, population:number, attractions?:Attractions[]){
    this._id=_id;
    this.name = name;
    this.population=population;
    this.attractions=attractions??[];

  }
}

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries!:Countries[];

  @ViewChild("searchForm")
  searchForm!:NgForm
  
  constructor(private countriesService:CountriesDataService) { }

  ngOnInit(): void {
    console.log("_ngOnInit Start");
    this.getData();
    console.log("_ngOnInit End"); 
  }

  getData(){
    this.countriesService.getAllCountries().subscribe({
      next:(result)=>{
        console.log(result);
        
        this.countries = result;
      },
      error:(err)=>{
        console.log("Find and error", err);
      },
      complete:()=>{
        console.log("Get All countries");
      }
    });
  }

  onSearch(){
    let countryName = this.searchForm.value.countryName;
    console.log(countryName);
    
    // if(!countryName && countryName!=''){
      this.countriesService.getSearchCountries(countryName).subscribe({
        next:(result)=>{
          console.log(result);
          
          this.countries = result;
        },
        error:(err)=>{
          console.log("Find and error", err);
        },
        complete:()=>{
          console.log("Get All countries");
        }
      });
    // }
  }
}