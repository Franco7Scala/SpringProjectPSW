package it.frankladder.fakestore.controllers.rest;


import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class HomeController {


    @GetMapping("/")
    public String home(@AuthenticationPrincipal OidcUser user, @RequestParam(value = "someValue") int value) {
        return "Welcome, " + user.getFullName() + " " + value + " !";
    }


}


