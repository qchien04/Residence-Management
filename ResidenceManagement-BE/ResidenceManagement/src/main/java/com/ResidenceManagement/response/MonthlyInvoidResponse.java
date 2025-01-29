package com.ResidenceManagement.response;


import com.ResidenceManagement.entity.roomManagement.MonthlyInvoice;
import com.ResidenceManagement.entity.roomManagement.RoomRentalDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyInvoidResponse {
    private Integer id;

    private Boolean paid;

    private Integer person_quantity;

    private Integer new_electric_number;

    private Integer last_electric_number;

    private Integer new_water_number;

    private Integer last_water_number;

    private String payment_month;

    private Integer surcharge;

    private String note;

    private String motelRoom_name;

    private Integer motelRoom_id;

    private Integer roomRentalDetail_id;

    private String tenant_name;
    public MonthlyInvoidResponse(MonthlyInvoice i) {
        this.id = i.getId();
        this.paid = i.getPaid();
        this.person_quantity = i.getPerson_quantity();
        this.new_electric_number = i.getNew_electric_number();
        this.last_electric_number = i.getLast_electric_number();
        this.new_water_number = i.getNew_water_number();
        this.last_water_number = i.getLast_water_number();
        this.payment_month = i.getPayment_month();
        this.surcharge = i.getSurcharge();
        this.note = i.getNote();
        this.motelRoom_name = i.getRoomRentalDetail().getMotelRoom().getName();
        this.motelRoom_id = i.getRoomRentalDetail().getMotelRoom().getId();
        this.tenant_name = i.getRoomRentalDetail().getTenant().getUserProfile().getName();
        this.roomRentalDetail_id=i.getRoomRentalDetail().getId();
    }
}
