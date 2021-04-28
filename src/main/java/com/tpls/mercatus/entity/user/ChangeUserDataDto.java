package com.tpls.mercatus.entity.user;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ChangeUserDataDto {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String city;

}
