package com.ResidenceManagement.controller.roomManagement;



import com.ResidenceManagement.entity.roomManagement.Amenity;
import com.ResidenceManagement.entity.roomManagement.MotelRoom;
import com.ResidenceManagement.request.CreateAmenityRequest;
import com.ResidenceManagement.request.CreateMotelRoomRequest;
import com.ResidenceManagement.response.AmenityResponse;
import com.ResidenceManagement.response.ApiResponse;
import com.ResidenceManagement.service.RoomManagement.AmenityService;
import com.ResidenceManagement.service.RoomManagement.MotelRoomService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/amenity")
public class AmenityController {

    private AmenityService amenityService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createAmenity(@RequestBody CreateAmenityRequest createAmenityRequest) {

        Amenity amenity=new Amenity();
        amenity.setName(createAmenityRequest.getName());
        amenity.setCost(createAmenityRequest.getCost());
        amenity.setPer_capita(createAmenityRequest.isPer_capita());
        System.out.println(amenity);

        amenityService.createAmenity(amenity);


        return new ResponseEntity<ApiResponse>(new ApiResponse("Success",true), HttpStatus.CREATED);
    }

    @GetMapping("/allAmenity")
    public ResponseEntity<List<AmenityResponse>> getAllAmenity() {


        List<Amenity> arr=amenityService.findAllAmenity();

        List<AmenityResponse> ans=new ArrayList<>();
        for(Amenity i:arr){
            ans.add(new AmenityResponse(i.getId(),i.getName(),i.getCost(),i.isPer_capita()));
        }

        return new ResponseEntity<List<AmenityResponse>>(ans, HttpStatus.OK);
    }


}
