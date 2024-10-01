# From what Image we base our application on, "base-image"
# Build phase: Build Application. Robust Image
FROM maven:3.9.9-eclipse-temurin-21 AS build

LABEL authors="jacob.persson"

WORKDIR /build

# Copy dependencies and source files to build image (?)
COPY pom.xml .
COPY src ./src

# Run build command, without tests
RUN mvn clean package -DskipTests
# RUN mvn dependency:go-offline -B

# Production phase: Produce Image. Lighweight image to minimize size
FROM eclipse-temurin:21-jdk-alpine

# Establish root for the rest of the file
WORKDIR /app

# Copy step, contents from the jar into a new jar. Generic - "app.jar"
COPY --from=build /build/target/*.jar app.jar

# Container listens to the specified network port
# Automatically exposed to 8080, this should match the port specified in
# applications.properties. compose.yml handles the port assignement anyway.
EXPOSE 8080

# Start command, CMD: add personalized arguments. ENTRYPOINT: no arguments
ENTRYPOINT ["java", "-jar", "app.jar"]

# ARG works like a variable
# ARG DEPENDENCY=target/dependency

# Splitting Dependencies and classes (?)
# COPY ${DEPENDENCY}/BOOT-INF/lib /app/lib
# COPY ${DEPENDENCY}/META-INF /app/META-INF
# COPY ${DEPENDENCY}/BOOT-INF/classes /app

# ENTRYPOINT ["java","-cp","app:app/lib/*","com.cygni.azure.AzureApplication"]