package com.tpls.paradigme.service;

import com.tpls.paradigme.entity.LoginDto;
import com.tpls.paradigme.entity.User;
import com.tpls.paradigme.entity.UserRole;
import com.tpls.paradigme.repository.UserRepository;
import com.tpls.paradigme.util.JwtUtil;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Setter(onMethod = @__(@Autowired))
public class UserService implements UserDetailsService {

    private UserRepository userRepository;
    private StorageService storageService;
    private JwtUtil jwtUtil;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email);
    }

    public String authorizeUser(LoginDto dto) {
        User user = (User) loadUserByUsername(dto.getUsername());
        if (user != null && bCryptPasswordEncoder.matches(dto.getPassword(), user.getPassword())) {
            Map<String, String> claims = new HashMap<>();
            claims.put("username", user.getUsername());
            claims.put("userId", user.getId());
            claims.put("authorities", user.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.joining(",")));
            return jwtUtil.createJwtForClaims(user.getUsername(), claims);
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authorized");
    }

    public void createUser(User user, MultipartFile file) throws IOException {
        if (loadUserByUsername(user.getEmail()) == null) {
            user.setRole(UserRole.USER);
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

            user = userRepository.insert(user);

            storageService.createUserFolder(user.getId());
            if (file.getBytes().length != 0) {
                String fileName = file.getName() + ".jpg";
                user.setImageUrl(fileName);
                storageService.saveAndCompressImage(file.getInputStream(), user.getId(), fileName);
                userRepository.save(user);
            }
        }
    }

    public byte[] readUserPhoto(User user) {
        return storageService.loadUserFile(user.getId() + '/' + user.getImageUrl());
    }

}
