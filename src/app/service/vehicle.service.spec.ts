import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { VehicleService } from './vehicle.service';

describe('VehicleService', () => {
  let injector: TestBed;
  let service: VehicleService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [VehicleService]}
    );
    injector = getTestBed();
    service = injector.get(VehicleService);
    httpMock = injector.get(HttpTestingController);
  });
  it('should be created', () => {
    const service: VehicleService = TestBed.get(VehicleService);
    expect(service).toBeTruthy();
  });
  afterEach(() => {
    httpMock.verify();
  });
  describe('#getVehicles', () => {
    it('should return an Observable<any>', () => {
      service.GetVehicles().subscribe(vehicles => {
        debugger;
        expect(vehicles.length).toBe(1);
      });
      const req = httpMock.expectOne(`${service.baseurl}/vehicles/`);
    expect(req.request.method).toBe("GET");
    req.flush([
   
      {
         "id":"ftype",
         "modelYear":"k17",
         "url":"/api/vehicle/ftype",
         "media":[
            {
               "name":"vehicle",
               "url":"/images/ftype_k17.jpg"
            }
         ]
      }
   ]);
    });
  });
  describe('#getVehicleById', () => {
    it('should return an Observable<any>', () => {
      service.GetVehicle("xe").subscribe(vehicle => {
        debugger
        expect(vehicle.id).toBe("xe");
      });
      const req = httpMock.expectOne(`${service.baseurl}/vehicle/xe`);
    expect(req.request.method).toBe("GET");
    req.flush({"id":"xe"});
    });
  });
});
