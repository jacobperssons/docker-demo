package com.cygni.azure.controller;

import com.cygni.azure.model.Greeting;
import com.cygni.azure.model.User;
import com.cygni.azure.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    // @GetMapping("/")
    public String showWelcomePage(ModelMap model) {
        model.put("name", getLoggedInUserName());
        return "WELCOME!";
    }

    private String getLoggedInUserName() {
        Object principal = SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        return principal instanceof UserDetails
                ? ((UserDetails) principal).getUsername()
                : principal.toString();
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello World !!";
    }

    @GetMapping("/hello/{message}")
    public Greeting greeting(@PathVariable String message) {
        return new Greeting("You are " + message);
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }

        return "redirect:/";
    }

}
