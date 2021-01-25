package com.tpls.paradigme.configuration;

import com.tpls.paradigme.filter.AuthFilter;
import com.tpls.paradigme.filter.AuthProvider;
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
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.NegatedRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

@Configuration
@EnableWebSecurity
@Setter(onMethod = @__(@Autowired))
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private static final RequestMatcher NOT_AUTHENTICATED_PATHS = new OrRequestMatcher(
            new AntPathRequestMatcher("/ad/**"),
            new AntPathRequestMatcher("/search"),
            new AntPathRequestMatcher("/profile/create"),
            new AntPathRequestMatcher("/profile/login"),
            new AntPathRequestMatcher("/profile/get"),
            new AntPathRequestMatcher("/error")
    );

    private static final RequestMatcher ONLY_AUTHENTICATED_PATHS = new NegatedRequestMatcher(NOT_AUTHENTICATED_PATHS);

    private UserService userService;
    private AuthProvider authProvider;

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
                .logout(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .authenticationProvider(authProvider)
                .addFilterBefore(authFilter(), AnonymousAuthenticationFilter.class)
                .authorizeRequests().requestMatchers(ONLY_AUTHENTICATED_PATHS).authenticated()
                .and().exceptionHandling()
                .and().headers().frameOptions().sameOrigin()
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder())
                .and().authenticationProvider(authProvider);
    }

    @Bean
    public AuthFilter authFilter() throws Exception {
        AuthFilter authFilter = new AuthFilter(ONLY_AUTHENTICATED_PATHS);
        authFilter.setAuthenticationManager(authenticationManager());
        return authFilter;
    }
}
