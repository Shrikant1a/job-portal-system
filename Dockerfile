# Build stage
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy only necessary files for the backend build
COPY lib/ ./lib/
COPY src/ ./src/

# Create bin directory
RUN mkdir -p bin

# Compile the Java application
# Note: Ensure all subpackages are included if they exist
RUN javac -cp "lib/*" -d bin src/com/jobportal/application/*.java src/com/jobportal/application/models/*.java

# Run stage
EXPOSE 8080

# The PORT environment variable is automatically handled by the ApiServer code
CMD ["java", "-cp", "bin:lib/*", "com.jobportal.application.ApiServer"]
