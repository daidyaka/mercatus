package com.tpls.paradigme.service;

import com.tpls.paradigme.entity.user.ChangePasswordDto;
import com.tpls.paradigme.entity.user.ChangeUserDataDto;
import com.tpls.paradigme.entity.user.User;
import com.tpls.paradigme.entity.user.UserRole;
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
            user.setPassword(hashPassword(user.getPassword()));

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

    public boolean updatePassword(User user, ChangePasswordDto dto) {
        if (!dto.getOldPassword().equals(user.getPassword())) {
            return false;
        }

        if (dto.getNewPassword().equals(dto.getNewPasswordRepeated())) {
            user.setPassword(hashPassword(dto.getNewPassword()));
            return updateUser(user) != null;
        }

        return false;
    }

    public User updateUser(User user, ChangeUserDataDto dto) {
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setCity(dto.getCity());
        return updateUser(user);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public byte[] readUserPhoto(User user) {
        return storageService.loadUserFile(user.getId() + '/' + user.getImageUrl()).getBytes();
    }

    private String hashPassword(String password) {
        return bCryptPasswordEncoder.encode(password);
    }

}
