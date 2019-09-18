import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  constructor(private vehicleService: VehicleService) { }
  vehicles: any = [];
  ngOnInit() {
    this.vehicleService.GetVehicles().subscribe(res => {
      this.vehicles = res;
      this.vehicles.forEach((vehicle: any)=>{
        this.vehicleService.GetVehicle(vehicle.id).subscribe(data=>{
          vehicle.details = data;
        });
      });
    });
  }

}
