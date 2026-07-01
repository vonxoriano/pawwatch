package edu.cit.soriano.pawwatch.controller;

import edu.cit.soriano.pawwatch.dto.LoginRequest;
import edu.cit.soriano.pawwatch.dto.RegisterRequest;
import edu.cit.soriano.pawwatch.entity.User;
import edu.cit.soriano.pawwatch.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User user = userService.register(request);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Registration successful");
            response.put("userId", user.getUserId());
            response.put("email", user.getEmail());
            response.put("role", user.getRole());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = userService.login(request);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("userId", user.getUserId());
            response.put("email", user.getEmail());
            response.put("role", user.getRole());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}