import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountriesDataService } from '../countries-data.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  @Input()
  countryId!:string;

 constructor(private dataservice:CountriesDataService, private router:Router) { }

  ngOnInit(): void {
  }

  onDelete(){
    this.dataservice.deleteOne(this.countryId).subscribe(
      {
       next:(result)=>{
       this.router.navigate(['/countries']); 
      },
      error:(err)=>{
        console.log("Find an error",err);
      },
      complete:()=>{
        console.log("Get All Receipe Completed");
      }
      });

  }


}