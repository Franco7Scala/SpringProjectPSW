package it.frankladder.fakestore.controllers.rest;


import it.frankladder.fakestore.support.exceptions.MailUserAlreadyExistException;
import it.frankladder.fakestore.entities.User;
import it.frankladder.fakestore.services.AccountingService;
import it.frankladder.fakestore.support.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/users")
public class AccountingController {
    @Autowired
    private AccountingService accountingService;


    @PostMapping
    public ResponseEntity create(@RequestBody @Valid User user) {
        try {
            accountingService.registerUser(user);
        } catch (MailUserAlreadyExistException e) {
            return new ResponseEntity<>(new ResponseMessage("E-mail address already exist!"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseMessage("Added successful!"), HttpStatus.OK); // esempio va tornato l'utente
    }

    @GetMapping
    public List<User> getAll() {
        return accountingService.getAllUsers();
    }


}
