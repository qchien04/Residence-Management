//package com.ResidenceManagement.controller.auth;
//
//import com.ResidenceManagement.entity.roomManagement.Amenity;
//import com.ResidenceManagement.repository.RoleRepo;
//import com.ResidenceManagement.request.CreateAmenityRequest;
//import com.ResidenceManagement.response.ApiResponse;
//import com.ResidenceManagement.service.auth.RoleService;
//import lombok.AllArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@AllArgsConstructor
//@RestController
//@RequestMapping("/authentication")
//public class RoleController {
//    private RoleService roleService;
//
//
//    @PostMapping("/create")
//    public ResponseEntity<ApiResponse> createAmenity(@RequestBody CreateAmenityRequest createAmenityRequest) {
//
//        Amenity amenity = new Amenity();
//        amenity.setName(createAmenityRequest.getName());
//        amenity.setCost(createAmenityRequest.getCost());
//        amenity.setPer_capita(createAmenityRequest.isPer_capita());
//        System.out.println(amenity);
//
//        amenityService.createAmenity(amenity);
//
//
//        return new ResponseEntity<ApiResponse>(new ApiResponse("Success", true), HttpStatus.CREATED);
//    }
//
//
//
//}
