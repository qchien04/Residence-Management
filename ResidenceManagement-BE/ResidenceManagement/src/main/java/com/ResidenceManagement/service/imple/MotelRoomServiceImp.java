package com.ResidenceManagement.service.imple;


import com.ResidenceManagement.entity.roomManagement.MotelRoom;
import com.ResidenceManagement.repository.MotelRoomRepo;
import com.ResidenceManagement.service.RoomManagement.MotelRoomService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class MotelRoomServiceImp implements MotelRoomService {
    private MotelRoomRepo motelRoomRepo;

    @Override
    @Transactional
    public MotelRoom createMotelRoom(MotelRoom motelRoom) {
        return motelRoomRepo.save(motelRoom);
    }

    @Override
    public List<MotelRoom> AllMotelRoom() {
        return motelRoomRepo.findAll();
    }

    @Override
    public List<MotelRoom> MyMotelRoom(String email) {
        return motelRoomRepo.MyMotelRoom(email);
    }

    @Override
    public List<MotelRoom> AllMotelRoomWithKey(String key) {
        return motelRoomRepo.findWithKey(key);
    }

    @Override
    public void updateMotelRoom(MotelRoom motelRoom) {
        motelRoomRepo.save(motelRoom);
    }

    @Override
    public void deleteMotelRoomById(Integer motelRoomId) {
        motelRoomRepo.delete(findMotelRoomById(motelRoomId));
    }


    @Override
    public MotelRoom findMotelRoomByName(String name) {
        //not support yet
        return null;
    }

    @Override
    public MotelRoom findMotelRoomById(Integer id) {
        Optional<MotelRoom> motelRoomOptional=motelRoomRepo.findById(id);
        return motelRoomOptional.isPresent()?motelRoomOptional.get():null;
    }
}
