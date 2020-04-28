package it.frankladder.orders.services;


import it.frankladder.orders.entities.User;
import it.frankladder.orders.repositories.UserRepository;
import it.frankladder.orders.support.exceptions.MailUserAlreadyExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;


@Service
public class AccountingService {
    @Autowired
    private UserRepository userRepository;


    @Transactional(readOnly = false)
    public void registerUser(User user) throws MailUserAlreadyExistException {
        if ( userRepository.existsByEmail(user.getEmail()) ) {
            throw new MailUserAlreadyExistException();
        }
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


}
