package com.cygni.azure.config;

import com.cygni.azure.repository.TodoRepository;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Slf4j
@Configuration
public class DatabaseConfig {

    @Autowired
    private TodoRepository todoRepository;

    @Value("${azure.clear}")
    private boolean clearDatabase;

    @Value("${azure.startup}")
    private boolean startup;

    @PostConstruct
    public void init() {
        var load = todoRepository.count();

        if (clearDatabase && load > 0) {
            log.info("Clearing Database load: {} units", load);

            todoRepository.deleteAll();
            // load = 0;
        }
    }
}
