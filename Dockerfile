# Build stage
# Switching to eclipse-temurin as 'openjdk' images are deprecated and causing registry errors
FROM eclipse-temurin:17-jdk as build

WORKDIR /app

# Copy the entire backend structure
COPY lib/ ./lib/
COPY src/ ./src/

# Create bin directory
RUN mkdir -p bin

# Use a more robust way to find and compile all Java files
RUN find src -name "*.java" > sources.txt && \
    javac -cp "lib/*" -d bin @sources.txt

# Run stage
# We can use a smaller JRE image for running
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy the compiled classes and libraries from the build stage
COPY --from=build /app/bin ./bin
COPY --from=build /app/lib ./lib

# Expose the port
EXPOSE 8080

# The PORT environment variable is automatically handled by the ApiServer code
CMD ["java", "-cp", "bin:lib/*", "com.jobportal.application.ApiServer"]
