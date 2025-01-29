package com.ResidenceManagement.repository;

import com.ResidenceManagement.entity.auth.User;
import com.ResidenceManagement.entity.roomManagement.RoomRentalDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRentalDetailRepo extends JpaRepository<RoomRentalDetail,Integer> {
    Optional<RoomRentalDetail> findById(Integer id);

    List<RoomRentalDetail> findByTenant_Id(Integer id);

    List<RoomRentalDetail> findByMotelRoom_Id(Integer id);

    @Query("SELECT rd FROM RoomRentalDetail rd WHERE rd.motelRoom.owner = :user")
    List<RoomRentalDetail> findByOwnerOfMotelRoom(User user);
}