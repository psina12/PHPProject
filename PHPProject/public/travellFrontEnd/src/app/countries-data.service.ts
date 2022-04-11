import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attractions, Countries } from './countries/countries.component';


@Injectable({
  providedIn: 'root'
})
export class CountriesDataService {
baseUrl:string = "http://localhost:3000/api/"
constructor(private http:HttpClient) { }

public getAllCountries(): Observable<Countries[]>{
  return this.http.get<Countries[]>(this.baseUrl + 'country');
}
public getSearchCountries(countryName:string): Observable<Countries[]>{
    return this.http.get<Countries[]>(this.baseUrl + 'country?country='+countryName);
  }

  getOneCountry(countryId:string):Observable<Countries>{
    const url:string = this.baseUrl + "country/" + countryId;
    return this.http.get<Countries>(url);
}

  deleteOne(countryId:string){
    const url:string = this.baseUrl +"country/" + countryId;
    return this.http.delete<Countries>(url);
  }

  AddoneCountry(country:Countries){
    const url:string = this.baseUrl + "country";
    console.log("addone", url, country);
    return this.http.post<any>(url, country);
  }

addOneAttractions(countryId:string, attractions:Attractions):Observable<any>{
    const url:string = this.baseUrl + "country/" +countryId+ "/attractions";
   // const url= environment.BASE_URL+"country/"+countryId+"/attractions";
    return this.http.post<any>(url, attractions); 
  }

  editOneReceipe(countryId:string, country:Countries):Observable<any>{
    const url:string = this.baseUrl + "country/" +countryId;
   // const url= environment.BASE_URL+"receipes/"+receipeId;
    return this.http.patch<any>(url, countryId); 
  }

  editOneAttraction(countryId:string,  attractionId:string, attractions:Attractions):Observable<any>{
   // const url= environment.BASE_URL+"receipes/"+receipeId+"/ingredients/"+ingredient._id;
    const url:string = this.baseUrl + "country/" +countryId +"/attractions/"+attractionId;
    console.log("editOneAttraction = url", url, attractions, attractionId);
    return this.http.patch<any>(url, attractions); 
  }

  deleteOneAttraction(countryId:string, attractionId:string):Observable<any>{
    const url: string = this.baseUrl + "country/"+countryId+"/attractions/"+attractionId;
    console.log("url", url);
    
    // const url= environment.BASE_URL+"receipes/"+receipeId+"/ingredients/"+ingredientId;
    return this.http.delete<any>(url);
  }
}



