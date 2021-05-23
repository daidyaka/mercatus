package com.tpls.mercatus.entity.user;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
public class LoginDto {

    @NotBlank
    private String username;

    @Size(min = 6)
    @NotBlank
    private String password;

}
