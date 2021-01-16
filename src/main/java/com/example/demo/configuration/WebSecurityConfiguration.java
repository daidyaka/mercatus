package com.example.demo.configuration;

import com.example.demo.entity.UserRole;
import com.example.demo.service.UserService;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
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
        http.csrf().disable()
                .authorizeRequests()
                    .antMatchers(onlyAnonymousPaths()).not().fullyAuthenticated()
                    .antMatchers(anonymousAllowedPaths()).permitAll()
                    .antMatchers("/**").hasAnyRole(UserRole.USER.name(), UserRole.ADMIN.name())
                .anyRequest().authenticated()
                .and()
                    .formLogin()
                    .loginPage("/login.html")
                    .defaultSuccessUrl("/profile.html")
                    .permitAll()
                .and()
                    .logout()
                    .permitAll()
                    .logoutSuccessUrl("/")
                .and().headers()
                .frameOptions().sameOrigin();

    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder());
    }

    private String[] anonymousAllowedPaths() {
        return new String[]{
                "/",
                "/styles/**",
                "/scripts/**",
                "/js/**",
                "/ad/**",
                "/search",
                "/search.html",
                "/is-authenticated",
                "/profile/get"
        };
    }

    private String[] onlyAnonymousPaths() {
        return new String[]{
                "/registration.html",
                "/profile/create",
                "/login"
        };
    }
}
