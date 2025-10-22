package com.voulerparavoce.dto;

import com.voulerparavoce.entity.Role;

import java.util.List;

public record RecoveryUserDto(
        Long id,
        String email,
        List<Role> roles
) {
}
