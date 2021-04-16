package com.tpls.paradigme.service;

import com.tpls.paradigme.entity.User;
import com.tpls.paradigme.entity.UserRole;
import com.tpls.paradigme.repository.UserRepository;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@Setter(onMethod = @__(@Autowired))
public class UserService implements UserDetailsService {

    private UserRepository userRepository;
    private StorageService storageService;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email);
    }

    public void createUser(User user, MultipartFile file) throws IOException {
        if (loadUserByUsername(user.getEmail()) == null) {
            user.setRole(UserRole.USER);
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

            user = userRepository.insert(user);

            storageService.createUserFolder(user.getId());
            if (file.getBytes().length != 0) {
                String fileName = file.getName();
                user.setImageUrl(fileName);
                storageService.saveAndCompressImage(file.getInputStream(), user.getId(), fileName);
                userRepository.save(user);
            }
        }
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public byte[] readUserPhoto(User user) {
        return storageService.loadUserFile(user.getId() + '/' + user.getImageUrl()).getBytes();
    }

}
