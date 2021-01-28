package com.tpls.paradigme.configuration;

import com.tpls.paradigme.entity.UserRole;
import com.tpls.paradigme.service.AuthenticationService;
import com.tpls.paradigme.service.UserService;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
@Setter(onMethod = @__(@Autowired))
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private UserService userService;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //TODO: Add /ad/.../review endpoint to a list where authentication is required (!!!)
        http
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .logout().permitAll().logoutSuccessUrl("http://localhost:3000/").and()
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeRequests(auth -> {
                    auth.antMatchers(notAuthenticatedPaths()).not().authenticated();
                    auth.antMatchers(anonymousPaths()).permitAll();
                    auth.antMatchers(onlyAuthenticatedPaths()).hasAnyRole(UserRole.USER.name(), UserRole.ADMIN.name());
                })
                .exceptionHandling()
                .and().headers().frameOptions().sameOrigin();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder());
    }

    @Bean
    public AuthenticationService authenticationService() throws Exception {
        return new AuthenticationService(authenticationManager());
    }

    private String[] notAuthenticatedPaths() {
        return new String[]{
                "/profile/create",
                "/profile/login"
        };
    }

    private String[] anonymousPaths() {
        return new String[]{
                "/ad/**",
                "/search",
                "/profile/get",
                "/error"
        };
    }

    private String[] onlyAuthenticatedPaths() {
        return new String[]{
                "/**"
        };
    }
}
