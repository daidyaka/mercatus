package com.tpls.paradigme.entity;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {

    USER,

    ADMIN;

    @Override
    public String getAuthority() {
        return "ROLE_" + this.name();
    }
}
