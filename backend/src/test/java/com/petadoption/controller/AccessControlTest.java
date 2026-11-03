package com.petadoption.controller;

import com.petadoption.config.PasswordConfig;
import com.petadoption.config.SecurityConfig;
import com.petadoption.model.AdoptionApplication;
import com.petadoption.model.ContactMessage;
import com.petadoption.model.Pet;
import com.petadoption.model.User;
import com.petadoption.model.Vaccination;
import com.petadoption.repository.ContactMessageRepository;
import com.petadoption.repository.StoryRepository;
import com.petadoption.repository.UserRepository;
import com.petadoption.repository.VaccinationRepository;
import com.petadoption.security.JwtAuthenticationFilter;
import com.petadoption.security.JwtService;
import com.petadoption.service.ApplicationService;
import com.petadoption.service.AuthService;
import com.petadoption.service.PetService;
import com.petadoption.service.StoryService;
import com.petadoption.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.not;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {
        AuthController.class,
        UserController.class,
        PetController.class,
        ApplicationController.class,
        StoryController.class,
        ContactController.class,
        VaccinationController.class
})
@Import({
        SecurityConfig.class,
        PasswordConfig.class,
        JwtService.class,
        JwtAuthenticationFilter.class,
        AuthService.class,
        UserService.class
})
@TestPropertySource(properties = {
        "app.jwt.secret=test-secret-key-that-is-long-enough-for-hs256",
        "app.jwt.expiration-ms=3600000",
        "spring.autoconfigure.exclude=org.springframework.boot.security.autoconfigure.UserDetailsServiceAutoConfiguration"
})
class AccessControlTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @MockitoBean
    private UserRepository userRepository;

    @MockitoBean
    private PetService petService;

    @MockitoBean
    private ApplicationService applicationService;

    @MockitoBean
    private StoryService storyService;

    @MockitoBean
    private StoryRepository storyRepository;

    @MockitoBean
    private ContactMessageRepository contactMessageRepository;

    @MockitoBean
    private VaccinationRepository vaccinationRepository;

    @Test
    void publicPetReadsAllowAnonymousAccess() throws Exception {
        when(petService.getAllPets()).thenReturn(List.of());

        mockMvc.perform(get("/api/pets"))
                .andExpect(status().isOk());
    }

    @Test
    void publicStoriesAndContactSubmissionAllowAnonymousAccess() throws Exception {
        when(storyRepository.findByIsApproved(true)).thenReturn(List.of());
        when(contactMessageRepository.save(any(ContactMessage.class)))
                .thenReturn(new ContactMessage());

        mockMvc.perform(get("/api/stories"))
                .andExpect(status().isOk());

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "Visitor",
                                  "email": "visitor@example.com",
                                  "message": "Hello"
                                }
                                """))
                .andExpect(status().isOk());
    }

    @Test
    void storyModerationRequiresStaffRole() throws Exception {
        when(storyRepository.findAll()).thenReturn(List.of());

        mockMvc.perform(get("/api/stories/all"))
                .andExpect(status().isUnauthorized());

        mockMvc.perform(get("/api/stories/all")
                        .header("Authorization", bearer("ADOPTER", 7)))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/api/stories/all")
                        .header("Authorization", bearer("STAFF", 2)))
                .andExpect(status().isOk());
    }

    @Test
    void applicationSubmissionRequiresAdopterAndUsesTokenIdentity() throws Exception {
        when(applicationService.submitApplication(any(), eq(7)))
                .thenReturn(new AdoptionApplication());

        mockMvc.perform(post("/api/applications")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"petId": 1, "homeType": "House", "reason": "Love pets"}
                                """))
                .andExpect(status().isUnauthorized());

        mockMvc.perform(post("/api/applications")
                        .header("Authorization", bearer("ADMIN", 1))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"petId": 1, "homeType": "House", "reason": "Love pets"}
                                """))
                .andExpect(status().isForbidden());

        mockMvc.perform(post("/api/applications")
                        .header("Authorization", bearer("ADOPTER", 7))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "petId": 1,
                                  "adopter": {"id": 99},
                                  "homeType": "House",
                                  "reason": "Love pets"
                                }
                                """))
                .andExpect(status().isOk());

        verify(applicationService).submitApplication(any(), eq(7));
    }

    @Test
    void applicationReviewRequiresStaffRole() throws Exception {
        when(applicationService.getAllApplications()).thenReturn(List.of());
        when(applicationService.updateStatus(
                eq(1),
                eq(AdoptionApplication.Status.APPROVED),
                eq(null)
        )).thenReturn(new AdoptionApplication());

        mockMvc.perform(get("/api/applications")
                        .header("Authorization", bearer("ADOPTER", 7)))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/api/applications")
                        .header("Authorization", bearer("STAFF", 2)))
                .andExpect(status().isOk());

        mockMvc.perform(put("/api/applications/1/status")
                        .param("status", "APPROVED")
                        .header("Authorization", bearer("ADOPTER", 7)))
                .andExpect(status().isForbidden());

        mockMvc.perform(put("/api/applications/1/status")
                        .param("status", "APPROVED")
                        .header("Authorization", bearer("STAFF", 2)))
                .andExpect(status().isOk());
    }

    @Test
    void adopterCanOnlyReadOwnApplications() throws Exception {
        when(applicationService.getApplicationsByAdopter(7)).thenReturn(List.of());

        mockMvc.perform(get("/api/applications/adopter/7")
                        .header("Authorization", bearer("ADOPTER", 7)))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/applications/adopter/8")
                        .header("Authorization", bearer("ADOPTER", 7)))
                .andExpect(status().isForbidden());
    }

    @Test
    void petWritesRequireStaffRole() throws Exception {
        when(petService.addPet(any(Pet.class))).thenReturn(new Pet());

        mockMvc.perform(post("/api/pets")
                        .header("Authorization", bearer("ADOPTER", 7))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name": "Bruno", "species": "Dog"}
                                """))
                .andExpect(status().isForbidden());

        mockMvc.perform(post("/api/pets")
                        .header("Authorization", bearer("STAFF", 2))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name": "Bruno", "species": "Dog"}
                                """))
                .andExpect(status().isOk());
    }

    @Test
    void storySubmissionRequiresAdopterRole() throws Exception {
        when(storyService.submitStory(any(), eq(7)))
                .thenReturn(new com.petadoption.model.SuccessStory());

        mockMvc.perform(post("/api/stories")
                        .header("Authorization", bearer("STAFF", 2))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"petId": 1, "storyText": "A happy adoption"}
                                """))
                .andExpect(status().isForbidden());

        mockMvc.perform(post("/api/stories")
                        .header("Authorization", bearer("ADOPTER", 7))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"petId": 1, "storyText": "A happy adoption"}
                                """))
                .andExpect(status().isOk());
    }

    @Test
    void contactAndVaccinationAdministrationRequiresStaffRole() throws Exception {
        when(contactMessageRepository.findAll()).thenReturn(List.of());
        when(vaccinationRepository.findByPetId(1)).thenReturn(List.of(new Vaccination()));

        mockMvc.perform(get("/api/contact")
                        .header("Authorization", bearer("ADOPTER", 7)))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/api/contact")
                        .header("Authorization", bearer("ADMIN", 1)))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/vaccinations/pet/1")
                        .header("Authorization", bearer("ADOPTER", 7)))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/api/vaccinations/pet/1")
                        .header("Authorization", bearer("STAFF", 2)))
                .andExpect(status().isOk());
    }

    @Test
    void userLookupRequiresAuthentication() throws Exception {
        mockMvc.perform(get("/api/users/1"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void registrationIgnoresClientSuppliedRoleAndHashesPassword() throws Exception {
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            user.setId(11);
            return user;
        });

        mockMvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "New Adopter",
                                  "email": "new@example.com",
                                  "password": "secret123",
                                  "role": "ADMIN"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.role").value("ADOPTER"))
                .andExpect(jsonPath("$.password").doesNotExist())
                .andExpect(content().string(not(containsString("secret123"))));

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        User saved = userCaptor.getValue();
        assertEquals(User.Role.ADOPTER, saved.getRole());
        assertNotEquals("secret123", saved.getPassword());
        assertTrue(passwordEncoder.matches("secret123", saved.getPassword()));
    }

    @Test
    void passwordNeverAppearsInAnyResponseBody() throws Exception {
        User stored = new User();
        stored.setId(5);
        stored.setName("Ada");
        stored.setEmail("ada@example.com");
        stored.setPassword(passwordEncoder.encode("secret123"));
        stored.setRole(User.Role.ADOPTER);

        when(userRepository.findByEmail("ada@example.com")).thenReturn(Optional.of(stored));
        when(userRepository.findById(5)).thenReturn(Optional.of(stored));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email": "ada@example.com", "password": "secret123"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.password").doesNotExist())
                .andExpect(content().string(not(containsString("secret123"))))
                .andExpect(content().string(not(containsString(stored.getPassword()))));

        mockMvc.perform(get("/api/users/5")
                        .header("Authorization", bearer("ADMIN", 1)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("ada@example.com"))
                .andExpect(jsonPath("$.password").doesNotExist())
                .andExpect(content().string(not(containsString(stored.getPassword()))));
    }

    private String bearer(String role, Integer userId) {
        User user = new User();
        user.setId(userId);
        user.setEmail(role.toLowerCase() + userId + "@pawfind.com");
        user.setRole(User.Role.valueOf(role));
        return "Bearer " + jwtService.generateToken(user);
    }
}
