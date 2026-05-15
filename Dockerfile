# Build stage
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the entire backend structure
COPY lib/ ./lib/
COPY src/ ./src/

# Create bin directory
RUN mkdir -p bin

# Use a more robust way to find and compile all Java files
# This handles nested packages and multiple files more reliably
RUN find src -name "*.java" > sources.txt && \
    javac -cp "lib/*" -d bin @sources.txt

# Expose the port
EXPOSE 8080

# Run the application
CMD ["java", "-cp", "bin:lib/*", "com.jobportal.application.ApiServer"]
