package com.ResidenceManagement.mapper;

import com.ResidenceManagement.entity.roomManagement.RoomRentalDetail;
import com.ResidenceManagement.response.RoomRentalDetailResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoomRentalDetailMapper {

    @Mapping(source = "tenant.email", target = "tenant_email") // Lấy email của tenant
    @Mapping(source = "motelRoom.id", target = "motelRoom_id") // Lấy ID phòng trọ
    @Mapping(source = "motelRoom.name", target = "motelRoom_name") // Lấy tên phòng trọ
    RoomRentalDetailResponse toRoomRentalDetailDTO(RoomRentalDetail roomRentalDetail);
}
