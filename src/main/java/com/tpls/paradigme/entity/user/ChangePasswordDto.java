package com.tpls.paradigme.entity.user;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import static com.tpls.paradigme.entity.user.User.MIN_PASSWORD_LENGTH;

@Data
public class ChangePasswordDto {

    @NotBlank
    @Size(min = MIN_PASSWORD_LENGTH)
    private String oldPassword;

    @NotBlank
    @Size(min = MIN_PASSWORD_LENGTH)
    private String newPassword;

    @NotBlank
    @Size(min = MIN_PASSWORD_LENGTH)
    private String newPasswordRepeated;

}
