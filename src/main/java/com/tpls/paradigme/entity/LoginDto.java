package com.tpls.paradigme.entity;

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
