import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesDataService } from '../countries-data.service';
import { Attractions } from '../countries/countries.component';

@Component({
  selector: 'app-add-attractions',
  templateUrl: './add-attractions.component.html',
  styleUrls: ['./add-attractions.component.css']
})
export class AddAttractionsComponent implements OnInit {
 
   @Input()
   countryId!:string;

   @ViewChild("attractionForm")
   attractionForm!:NgForm;

   @Output()
   attractionEmitter: EventEmitter<number> = new EventEmitter<number>();

   attractions!:Attractions;
   isFormVisible:boolean=false;

 constructor(private dataservice:CountriesDataService) { }

 ngOnInit(): void {
    setTimeout(()=>{
      this.mainForm();
    },0)
 }

  mainForm(){
    this.attractions = new Attractions("","","");
    // this.attractionForm.setValue(this.attractions);
  }
 
  onAttractionClick(){
    this.isFormVisible=true;
  }

 onSubmit(){
  console.log("onSubmit", this.attractionForm.value);
  this.dataservice.addOneAttractions(this.countryId,this.attractionForm.value).subscribe({
   
    next:(result)=>{
      //  this.router.navigate(['/country/' + this.countryId]);
      //  this.mainForm();
    },
    error:(err)=>{
      console.log("Find an error", err);
      this.attractionEmitter.emit(500);
    },
    complete:()=>{
      this.attractionEmitter.emit(200);
      console.log("Get All Attractions Completed");
      this.isFormVisible =false;
    }
   });
 }
}
