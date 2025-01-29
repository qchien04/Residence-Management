package com.ResidenceManagement.service.auth;

import com.ResidenceManagement.entity.auth.Permission;

import java.util.List;

public interface PermissionService {
    Permission savePermission(Permission permission);
    Permission findPermissionById(Integer id);
    Permission findPermissionByName(String name);
    void deletePermissionById(Integer id);
    List<Permission> findAllPermission();
}
