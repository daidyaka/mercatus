package com.example.demo.entity;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {

    CLIENT {
        @Override
        public String getAuthority() {
            return "ROLE_CLIENT";
        }
    },

    ENTREPRENEUR {
        @Override
        public String getAuthority() {
            return "ROLE_ENTREPRENEUR";
        }
    };

}
