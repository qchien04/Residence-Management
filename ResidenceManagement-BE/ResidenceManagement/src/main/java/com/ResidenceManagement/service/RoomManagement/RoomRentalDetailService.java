package com.ResidenceManagement.service.RoomManagement;

import com.ResidenceManagement.entity.auth.User;
import com.ResidenceManagement.entity.roomManagement.RoomRentalDetail;

import java.util.List;

public interface RoomRentalDetailService {

    RoomRentalDetail createRoomRentalDetail(RoomRentalDetail roomRentalDetail);
    RoomRentalDetail findById(Integer id);
    List<RoomRentalDetail> findByTenant_Id(Integer id);
    List<RoomRentalDetail> findAllRoomRentalDetail();
    List<RoomRentalDetail> findMyRoomRentalDetails(String email);
    List<RoomRentalDetail> findByMotelRoom_Id(Integer id);
    List<RoomRentalDetail> findByOwnerOfMotelRoom(User user);

    List<RoomRentalDetail> findByTenantOfMotelRoom(User user);


    void deleteRoomRentalDetailById(Integer id);
}
