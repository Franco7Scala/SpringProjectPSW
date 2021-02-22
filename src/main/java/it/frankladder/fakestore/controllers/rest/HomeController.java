package it.frankladder.fakestore.controllers.rest;


import it.frankladder.fakestore.support.authentication.Utils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class HomeController {


    @GetMapping("/")
    @PreAuthorize("hasAuthority('user')")
    public String home(@RequestParam(value = "someValue") int value) {
        return "Welcome, " + Utils.getEmail() + " " + value + " !";
    }


}


