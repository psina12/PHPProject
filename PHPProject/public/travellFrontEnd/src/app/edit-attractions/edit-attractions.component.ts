import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesDataService } from '../countries-data.service';
import { Attractions } from '../countries/countries.component';

@Component({
  selector: 'app-edit-attractions',
  templateUrl: './edit-attractions.component.html',
  styleUrls: ['./edit-attractions.component.css']
})
export class EditAttractionsComponent implements OnInit {
  
  @Input()
  countryId!:string;

  @Input()
  attractions!:Attractions;

  @ViewChild("attractionForm")
    attractionForm!:NgForm;

  @Output()
  attractionEmitter:EventEmitter<number> = new EventEmitter<number>();

  isFormVisible:boolean=false;

  constructor(private dataservice:CountriesDataService) { }

  ngOnInit(): void {

    setTimeout(()=>{
      this.mainForm();
    },0)
  }

  mainForm(){
    this.attractionForm.setValue(this.attractions);
  }

  onAttractionClick(){
    this.isFormVisible=true;
  }

  onDelete(){
    console.log("onDelete called");
    console.log(this.countryId, this.attractions._id);
    
    this.dataservice.deleteOneAttraction(this.countryId, this.attractions._id).subscribe({
      next:(result)=>{
      }, 
      error:(err)=>{
        console.log("Find an error", err);
        this.attractionEmitter.emit(500);
      },
      complete:()=>{
        this.attractionEmitter.emit(200);
        console.log("Attractions is deleted");
        this.isFormVisible = false;
      }
    });
  }
  onEditClick(){
    console.log("onEdit called", this.countryId,this.attractionForm.value);
    this.dataservice.editOneAttraction(this.countryId, this.attractions._id, this.attractionForm.value).subscribe({
      next:(result)=>{
      }, 
      error:(err)=>{
        console.log("Find an error", err);
        this.attractionEmitter.emit(500);
      },
      complete:()=>{
        this.attractionEmitter.emit(200);
        console.log("Attractions edited");
        this.isFormVisible = false;
      }
    });
  }
}
