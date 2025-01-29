package com.ResidenceManagement.controller.roomManagement;


import com.ResidenceManagement.entity.auth.User;
import com.ResidenceManagement.entity.roomManagement.MonthlyInvoice;
import com.ResidenceManagement.request.CreatMonthlyInvoiceRequest;
import com.ResidenceManagement.response.ApiResponse;
import com.ResidenceManagement.response.MonthlyInvoidResponse;
import com.ResidenceManagement.service.RoomManagement.MonthlyInvoiceService;
import com.ResidenceManagement.service.RoomManagement.MotelRoomService;
import com.ResidenceManagement.service.RoomManagement.RoomRentalDetailService;
import com.ResidenceManagement.service.auth.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/monthlyInvoice")
public class MonthlyInvoiceController {
    private RoomRentalDetailService roomRentalDetailService;
    private MotelRoomService motelRoomService;
    private UserService userService;
    private MonthlyInvoiceService monthlyInvoiceService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createAmenity(@RequestBody CreatMonthlyInvoiceRequest creatMonthlyInvoiceRequest) {

        MonthlyInvoice invoice=new MonthlyInvoice();

        invoice.setCreate_time(creatMonthlyInvoiceRequest.getCreate_time());
        invoice.setNote(creatMonthlyInvoiceRequest.getNote());
        invoice.setPaid(creatMonthlyInvoiceRequest.getPaid());
        invoice.setSurcharge(creatMonthlyInvoiceRequest.getSurcharge());
        invoice.setLast_electric_number(creatMonthlyInvoiceRequest.getLast_electric_number());
        invoice.setLast_water_number(creatMonthlyInvoiceRequest.getLast_water_number());
        invoice.setNew_electric_number(creatMonthlyInvoiceRequest.getNew_electric_number());
        invoice.setNew_water_number(creatMonthlyInvoiceRequest.getNew_water_number());
        invoice.setPayment_month(creatMonthlyInvoiceRequest.getPayment_month());
        invoice.setPerson_quantity(creatMonthlyInvoiceRequest.getPerson_quantity());
        invoice.setRoomRentalDetail(roomRentalDetailService.findById(creatMonthlyInvoiceRequest.getRoomRentalDetail_id()));

        System.out.println(invoice);

        monthlyInvoiceService.createMonthlyInvoice(invoice);


        return new ResponseEntity<ApiResponse>(new ApiResponse("Success",true), HttpStatus.CREATED);
    }

    @GetMapping("/allmonthlyInvoice")
    public ResponseEntity<List<MonthlyInvoidResponse>> getAllAmenity() {


        List<MonthlyInvoice> arr=monthlyInvoiceService.findAllMonthlyInvoice();

        List<MonthlyInvoidResponse> res=new ArrayList<>();

        for(MonthlyInvoice i:arr){
            MonthlyInvoidResponse invoidResponse=new MonthlyInvoidResponse();
            invoidResponse.setId((i.getId()));
            invoidResponse.setPaid(i.getPaid());
            invoidResponse.setPerson_quantity(i.getPerson_quantity());
            invoidResponse.setNew_electric_number(i.getNew_electric_number());
            invoidResponse.setLast_electric_number(i.getLast_electric_number());
            invoidResponse.setNew_water_number(i.getNew_water_number());
            invoidResponse.setLast_water_number(i.getLast_water_number());
            invoidResponse.setPayment_month(i.getPayment_month());
            invoidResponse.setSurcharge(i.getSurcharge());
            invoidResponse.setNote(i.getNote());
            invoidResponse.setMotelRoom_name(i.getRoomRentalDetail().getMotelRoom().getName());
            invoidResponse.setMotelRoom_id(i.getRoomRentalDetail().getMotelRoom().getId());
            invoidResponse.setTenant_name(i.getRoomRentalDetail().getTenant().getUserProfile().getName());
            invoidResponse.setRoomRentalDetail_id(i.getRoomRentalDetail().getId());
            res.add(invoidResponse);
        }

        return new ResponseEntity<List<MonthlyInvoidResponse>>(res, HttpStatus.OK);
    }


    @GetMapping("/myMonthlyInvoice")
    public ResponseEntity<List<MonthlyInvoidResponse>> getMyMonthlyInvoice() {

        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userService.findByEmail(email);
        List<MonthlyInvoice> arr=monthlyInvoiceService.findMonthlyInvoiceByOwner(user);

        List<MonthlyInvoidResponse> res=new ArrayList<>();

        for(MonthlyInvoice i:arr){
            MonthlyInvoidResponse invoidResponse=new MonthlyInvoidResponse();
            invoidResponse.setId((i.getId()));
            invoidResponse.setPaid(i.getPaid());
            invoidResponse.setPerson_quantity(i.getPerson_quantity());
            invoidResponse.setNew_electric_number(i.getNew_electric_number());
            invoidResponse.setLast_electric_number(i.getLast_electric_number());
            invoidResponse.setNew_water_number(i.getNew_water_number());
            invoidResponse.setLast_water_number(i.getLast_water_number());
            invoidResponse.setPayment_month(i.getPayment_month());
            invoidResponse.setSurcharge(i.getSurcharge());
            invoidResponse.setNote(i.getNote());
            invoidResponse.setMotelRoom_name(i.getRoomRentalDetail().getMotelRoom().getName());
            invoidResponse.setMotelRoom_id(i.getRoomRentalDetail().getMotelRoom().getId());
            invoidResponse.setTenant_name(i.getRoomRentalDetail().getTenant().getUserProfile().getName());
            invoidResponse.setRoomRentalDetail_id(i.getRoomRentalDetail().getId());
            res.add(invoidResponse);
        }

        return new ResponseEntity<List<MonthlyInvoidResponse>>(res, HttpStatus.OK);
    }

}
