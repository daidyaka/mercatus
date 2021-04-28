package com.tpls.mercatus.entity.user;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class LoginDto {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

}
