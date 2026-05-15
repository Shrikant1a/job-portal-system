# Use OpenJDK 17
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the entire project
COPY . .

# Create bin directory
RUN mkdir -p bin

# Compile the Java application
# We include the lib/*.jar in the classpath
RUN javac -cp "lib/*" -d bin src/com/jobportal/application/*.java src/com/jobportal/application/models/*.java

# Expose the port (Railway will provide this via environment variable)
EXPOSE 8080

# Command to run the application
# We use the 'port' logic implemented in ApiServer.java
CMD ["java", "-cp", "bin:lib/*", "com.jobportal.application.ApiServer"]
