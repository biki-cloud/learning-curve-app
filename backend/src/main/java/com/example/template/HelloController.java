package com.example.template;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class HelloController {

    @GetMapping("/hello")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    
}
