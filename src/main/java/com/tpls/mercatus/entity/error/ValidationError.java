package com.tpls.mercatus.entity.error;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ValidationError {

    private final HttpStatus status = HttpStatus.BAD_REQUEST;
    private Map<String, String> errors = new HashMap<>();
    private String message;

    public ValidationError(String message) {
        this.message = message;
    }
}
