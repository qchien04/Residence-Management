package com.ResidenceManagement.service.RoomManagement;

import com.ResidenceManagement.entity.auth.User;
import com.ResidenceManagement.entity.roomManagement.MonthlyInvoice;

import java.util.List;

public interface MonthlyInvoiceService {
    MonthlyInvoice createMonthlyInvoice(MonthlyInvoice monthlyInvoice);

    MonthlyInvoice findById(Integer id);

    List<MonthlyInvoice> findAllMonthlyInvoice();

    List<MonthlyInvoice> findMonthlyInvoiceByOwner(User user);

    List<MonthlyInvoice> findMonthlyInvoiceByTenant(User user);

    List<MonthlyInvoice> findByRoomRentalDetail_Id(Integer id);

    void deleteMonthlyInvoiceById(Integer id);
}
