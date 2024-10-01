package com.cygni.azure.model;

import jakarta.validation.constraints.Size;

import java.util.Date;

import lombok.Data;
import lombok.Builder;
import lombok.AllArgsConstructor;

import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Data
@Builder
@AllArgsConstructor
public class Todo {

    @MongoId(FieldType.OBJECT_ID)
    private int id;

    private String user;

    @Size(min = 10, message = "Enter at least 10 Characters...")
    private String description;

    private Date targetDate;

    private boolean isDone;

}
