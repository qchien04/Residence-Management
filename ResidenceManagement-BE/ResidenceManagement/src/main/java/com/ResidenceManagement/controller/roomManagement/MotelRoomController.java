package com.ResidenceManagement.controller.roomManagement;



import com.ResidenceManagement.entity.roomManagement.Amenity;
import com.ResidenceManagement.entity.roomManagement.MotelRoom;
import com.ResidenceManagement.request.CreateMotelRoomRequest;
import com.ResidenceManagement.response.ApiResponse;
import com.ResidenceManagement.response.MotelRoomResponse;
import com.ResidenceManagement.service.RoomManagement.AmenityService;
import com.ResidenceManagement.service.RoomManagement.MotelRoomService;
import com.ResidenceManagement.service.auth.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/motelRoom")
public class MotelRoomController {
    private MotelRoomService motelRoomService;
    private UserService userService;
    private AmenityService amenityService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createMotelRoomHandle(@RequestBody CreateMotelRoomRequest createMotelRoomRequest) {

        MotelRoom motelRoom = new MotelRoom();

        motelRoom.setCreated_at(LocalDateTime.now());
        motelRoom.setUpdated_at(LocalDateTime.now());

        motelRoom.setName(createMotelRoomRequest.getName());
        motelRoom.setType_room(createMotelRoomRequest.getType_room());
        motelRoom.setPrice_per_month(createMotelRoomRequest.getPrice_per_month());
        motelRoom.setDeposit(createMotelRoomRequest.getDeposit());
        motelRoom.setAvailability_status(createMotelRoomRequest.getAvailability_status());
        motelRoom.setElectricity_rate(createMotelRoomRequest.getElectricity_rate());
        motelRoom.setAddress(createMotelRoomRequest.getAddress());
        motelRoom.setWater_rate(createMotelRoomRequest.getWater_rate());
        motelRoom.setArea(createMotelRoomRequest.getArea());
        motelRoom.setInhabited(createMotelRoomRequest.getInhabited());
        motelRoom.setMax_guests(createMotelRoomRequest.getMax_guests());
        motelRoom.setBed_quantity(createMotelRoomRequest.getBed_quantity());
        motelRoom.setDescription(createMotelRoomRequest.getDescription());
        motelRoom.setImage_url(createMotelRoomRequest.getImage_url());
        motelRoom.setFloor(createMotelRoomRequest.getFloor());

        motelRoom.setOwner(userService.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()));

        // Ánh xạ tiện nghi (Amenities) từ request
        if (createMotelRoomRequest.getAmenities() != null) {
            for(int i:createMotelRoomRequest.getAmenities()){
                System.out.println(i);
                motelRoom.getAmenities().add(amenityService.findAmenityById(i));
            }

        }

        System.out.println(motelRoom);
        motelRoomService.createMotelRoom(motelRoom);

        return new ResponseEntity<ApiResponse>(new ApiResponse("Success",true), HttpStatus.CREATED);
    }

    @GetMapping("/allMotelRoom")
    public ResponseEntity<List<MotelRoomResponse>> getAllMotelRoom() {

        List<MotelRoom> arr=motelRoomService.AllMotelRoom();
        List<MotelRoomResponse> ans=new ArrayList<>();
        for(MotelRoom i:arr){
            MotelRoomResponse motelRoom = new MotelRoomResponse();

            motelRoom.setCreated_at(i.getCreated_at());
            motelRoom.setUpdated_at(i.getUpdated_at());
            motelRoom.setId(i.getId());
            motelRoom.setName(i.getName());
            motelRoom.setType_room(i.getType_room());
            motelRoom.setPrice_per_month(i.getPrice_per_month());
            motelRoom.setDeposit(i.getDeposit());
            motelRoom.setAvailability_status(i.getAvailability_status());
            motelRoom.setElectricity_rate(i.getElectricity_rate());
            motelRoom.setAddress(i.getAddress());
            motelRoom.setWater_rate(i.getWater_rate());
            motelRoom.setArea(i.getArea());
            motelRoom.setInhabited(i.getInhabited());
            motelRoom.setMax_guests(i.getMax_guests());
            motelRoom.setBed_quantity(i.getBed_quantity());
            motelRoom.setDescription(i.getDescription());
            motelRoom.setImage_url(i.getImage_url());
            motelRoom.setFloor(i.getFloor());
            motelRoom.setOwner(i.getOwner().getEmail());
            motelRoom.setImage_url(i.getImage_url());
            if (i.getAmenities() != null) {
                for(Amenity j:i.getAmenities()){
                    motelRoom.getAmenities().add(j.getId());
                }

            }
            ans.add(motelRoom);
        }
        return new ResponseEntity<List<MotelRoomResponse>>(ans, HttpStatus.OK);
    }

    @GetMapping("/myMotelRoom")
    public ResponseEntity<List<MotelRoomResponse>> getMyMotelRoom() {
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        List<MotelRoom> arr=motelRoomService.MyMotelRoom(email);
        List<MotelRoomResponse> ans=new ArrayList<>();
        for(MotelRoom i:arr){
            MotelRoomResponse motelRoom = new MotelRoomResponse();

            motelRoom.setCreated_at(i.getCreated_at());
            motelRoom.setUpdated_at(i.getUpdated_at());

            motelRoom.setId(i.getId());
            motelRoom.setName(i.getName());
            motelRoom.setType_room(i.getType_room());
            motelRoom.setPrice_per_month(i.getPrice_per_month());
            motelRoom.setDeposit(i.getDeposit());
            motelRoom.setAvailability_status(i.getAvailability_status());
            motelRoom.setElectricity_rate(i.getElectricity_rate());
            motelRoom.setAddress(i.getAddress());
            motelRoom.setWater_rate(i.getWater_rate());
            motelRoom.setArea(i.getArea());
            motelRoom.setInhabited(i.getInhabited());
            motelRoom.setMax_guests(i.getMax_guests());
            motelRoom.setBed_quantity(i.getBed_quantity());
            motelRoom.setDescription(i.getDescription());
            motelRoom.setImage_url(i.getImage_url());
            motelRoom.setFloor(i.getFloor());
            motelRoom.setOwner(i.getOwner().getEmail());
            motelRoom.setImage_url(i.getImage_url());
            if (i.getAmenities() != null) {
                for(Amenity j:i.getAmenities()){
                    motelRoom.getAmenities().add(j.getId());
                }

            }
            ans.add(motelRoom);
        }
        return new ResponseEntity<List<MotelRoomResponse>>(ans, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<MotelRoom>> SearchMotelRoom(@RequestParam(value = "key", required = false) String key) {


        List<MotelRoom> arr=motelRoomService.AllMotelRoomWithKey(key);

        return new ResponseEntity<List<MotelRoom>>(arr, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{motelRoomId}")
    public ResponseEntity<ApiResponse> deleteMotelRoomHandler(@PathVariable Integer motelRoomId){


        motelRoomService.deleteMotelRoomById(motelRoomId);

        ApiResponse res = new ApiResponse("Deleted Successfully...", true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/update/{motelRoomId}")
    public ResponseEntity<ApiResponse> UpdateMotelRoomHandler(@PathVariable Integer motelRoomId,
                                                                @RequestBody CreateMotelRoomRequest createMotelRoomRequest){


        MotelRoom motelRoom = new MotelRoom();

        motelRoom.setCreated_at(LocalDateTime.now());
        motelRoom.setUpdated_at(LocalDateTime.now());

        motelRoom.setName(createMotelRoomRequest.getName());
        motelRoom.setType_room(createMotelRoomRequest.getType_room());
        motelRoom.setPrice_per_month(createMotelRoomRequest.getPrice_per_month());
        motelRoom.setDeposit(createMotelRoomRequest.getDeposit());
        motelRoom.setAvailability_status(createMotelRoomRequest.getAvailability_status());
        motelRoom.setElectricity_rate(createMotelRoomRequest.getElectricity_rate());
        motelRoom.setAddress(createMotelRoomRequest.getAddress());
        motelRoom.setWater_rate(createMotelRoomRequest.getWater_rate());
        motelRoom.setArea(createMotelRoomRequest.getArea());
        motelRoom.setInhabited(createMotelRoomRequest.getInhabited());
        motelRoom.setMax_guests(createMotelRoomRequest.getMax_guests());
        motelRoom.setBed_quantity(createMotelRoomRequest.getBed_quantity());
        motelRoom.setDescription(createMotelRoomRequest.getDescription());
        motelRoom.setImage_url(createMotelRoomRequest.getImage_url());
        motelRoom.setFloor(createMotelRoomRequest.getFloor());

        motelRoom.setOwner(userService.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()));

        // Ánh xạ tiện nghi (Amenities) từ request
        if (createMotelRoomRequest.getAmenities() != null) {
            for(int i:createMotelRoomRequest.getAmenities()){
                System.out.println(i);
                motelRoom.getAmenities().add(amenityService.findAmenityById(i));
            }

        }

        motelRoom.setId(motelRoomId);

        motelRoomService.createMotelRoom(motelRoom);

        return new ResponseEntity<ApiResponse>(new ApiResponse("Success",true), HttpStatus.CREATED);

    }


}
