package com.cygni.azure.controller;

import com.cygni.azure.model.Todo;
import com.cygni.azure.repository.TodoRepository;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
public class TodoController {

    @Autowired
    TodoRepository todoRepository;

    @InitBinder // binds request parameters to objects
    public void initBinder(WebDataBinder binder) {
        // Date - dd/MM/yyyy
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyy");
        binder.registerCustomEditor(Date.class, new CustomDateEditor(
                dateFormat, false
        ));
    }

    @GetMapping("/list-todos")
    public List<Todo> showTodos() {
        String name = getLoggedInUserName();
        log.info("Name of user: {}", name);

        var todos = todoRepository.findByUser(name);
        todos.forEach(todo -> log.info("List of todos: {}", todo.getDescription()));

        return todos;
    }

    private String getLoggedInUserName() {
        Object principal = SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        return principal instanceof UserDetails
                ? ((UserDetails) principal).getUsername()
                : principal.toString();
    }

    @PostMapping("/add-todo")
    public Todo addTodo(@RequestBody Todo todo) {
        return todoRepository.save(
                Todo
                        .builder()
                        .user(getLoggedInUserName())
                        .description(todo.getDescription())
                        .targetDate(new Date())
                        .isDone(false)
                        .build());
    }

    @GetMapping("/delete-todo")
    public void deleteTodo(@RequestParam int id) {
        todoRepository.deleteById(id);
    }

    @PostMapping("/update-todo")
    public Todo updateTodo(@Valid Todo todo) {
        todo.setUser(getLoggedInUserName());
        return todoRepository.save(todo);
    }

}
