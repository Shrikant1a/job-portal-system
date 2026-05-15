package com.jobportal.application;

import com.jobportal.application.models.*;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.*;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import com.google.gson.*;

public class ApiServer {
    private static final int PORT = 8080;
    private static final Gson gson = new GsonBuilder()
            .registerTypeAdapter(LocalDateTime.class,
                    (JsonSerializer<LocalDateTime>) (src, typeOfSrc,
                            context) -> new JsonPrimitive(src.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)))
            .registerTypeAdapter(java.time.LocalDate.class,
                    (JsonSerializer<java.time.LocalDate>) (src, typeOfSrc,
                            context) -> new JsonPrimitive(src.format(DateTimeFormatter.ISO_LOCAL_DATE)))
            .create();

    public static void main(String[] args) throws IOException {
        // Initialize DB connection
        try {
            App.conn = DriverManager.getConnection(
                    "jdbc:mysql://" + DB_VARIABLES.HOST + ":" + DB_VARIABLES.PORT + "/" + DB_VARIABLES.DB + "?autoReconnect=true&useSSL=false",
                    DB_VARIABLES.USER, DB_VARIABLES.PASSWORD);
            System.out.println("Database successfully connected for API Server");
            App.initializeJobtypesAndschedules();
        } catch (SQLException e) {
            e.printStackTrace();
            return;
        }

        // Use PORT from environment variable (required for Railway/Render)
        String envPort = System.getenv("PORT");
        int port = (envPort != null) ? Integer.parseInt(envPort) : PORT;

        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        // Handlers
        server.createContext("/api/login", new LoginHandler());
        server.createContext("/api/signup", new SignupHandler());
        server.createContext("/api/jobs", new JobsHandler());
        server.createContext("/api/companies", new CompaniesHandler());
        server.createContext("/api/profile", new ProfileHandler());
        server.createContext("/api/external-jobs", new ExternalJobsHandler());
        server.createContext("/api/health", new HealthHandler());

        server.setExecutor(null); // creates a default executor
        System.out.println("Server started on port " + port);
        server.start();
    }

    static class LoginHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            App.reconnect();
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                InputStreamReader isr = new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8);
                JsonObject data = gson.fromJson(isr, JsonObject.class);
                String email = data.get("email").getAsString();
                String password = data.get("password").getAsString();

                try {
                    int id = User.login(email, password);
                    if (id != -1) {
                        Map<String, Object> response = new HashMap<>();
                        response.put("success", true);
                        response.put("user", App.logginUser); // This is risky due to global state but works for now
                        sendResponse(exchange, 200, response);
                    } else {
                        sendError(exchange, 401, "Invalid credentials");
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    sendError(exchange, 500, "Server error: " + e.getMessage());
                }
            } else {
                sendError(exchange, 405, "Method not allowed");
            }
        }
    }

    static class SignupHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            App.reconnect();
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                InputStreamReader isr = new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8);
                JsonObject data = gson.fromJson(isr, JsonObject.class);

                String firstName = data.get("firstName").getAsString();
                String lastName = data.get("lastName").getAsString();
                String email = data.get("email").getAsString();
                String password = data.get("password").getAsString();
                int type = data.get("userType").getAsInt();
                UserType userType = (type == 1) ? UserType.JOB_SEEKER : UserType.JOB_PROVIDER;

                String companyName = (data.has("companyName") && !data.get("companyName").isJsonNull())
                        ? data.get("companyName").getAsString()
                        : null;
                String designation = (data.has("designation") && !data.get("designation").isJsonNull())
                        ? data.get("designation").getAsString()
                        : null;
                // Frontend sends 'location', backend signUp expects 'companyLocation'
                String companyLocation = (data.has("location") && !data.get("location").isJsonNull())
                        ? data.get("location").getAsString()
                        : null;

                try {
                    int id = User.signUp(firstName, lastName, email, App.hashPassword(password), userType, companyName,
                            designation, companyLocation);
                    if (id != -1) {
                        Map<String, Object> response = new HashMap<>();
                        response.put("success", true);
                        response.put("id", id);
                        sendResponse(exchange, 200, response);
                    } else {
                        sendError(exchange, 400, "Signup failed");
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    sendError(exchange, 500, "Server error: " + e.getMessage());
                }
            } else {
                sendError(exchange, 405, "Method not allowed");
            }
        }
    }

    static class JobsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            App.reconnect();
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            if (!checkAuth(exchange))
                return;

            if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                try {
                    ArrayList<Job> jobs;
                    if (App.logginUser instanceof JobSeeker) {
                        jobs = ((JobSeeker) App.logginUser).getJobsFeed(new HashMap<>(), new HashMap<>(), -1, -1);
                    } else if (App.logginUser instanceof JobProvider) {
                        jobs = ((JobProvider) App.logginUser).getJobsFeed(new HashMap<>(), new HashMap<>(), -1, -1);
                    } else {
                        jobs = new ArrayList<>();
                    }
                    sendResponse(exchange, 200, jobs);
                } catch (Exception e) {
                    e.printStackTrace();
                    sendError(exchange, 500, "Server error");
                }
            } else {
                sendError(exchange, 405, "Method not allowed");
            }
        }
    }

    static class CompaniesHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            App.reconnect();
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            if (!checkAuth(exchange))
                return;

            if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                try {
                    ArrayList<Company> companies = new ArrayList<>();
                    if (App.logginUser instanceof JobSeeker) {
                        companies = ((JobSeeker) App.logginUser).getCompaniesFeed(new HashMap<>());
                    }
                    sendResponse(exchange, 200, companies);
                } catch (Exception e) {
                    e.printStackTrace();
                    sendError(exchange, 500, "Server error");
                }
            }
        }
    }

    static class ProfileHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            App.reconnect();
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            if (!checkAuth(exchange))
                return;

            if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                try {
                    App.logginUser.generateProfile();
                    sendResponse(exchange, 200, App.logginUser);
                } catch (SQLException e) {
                    sendError(exchange, 500, "Error generating profile");
                }
            }
        }
    }

    static class HealthHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            Map<String, Object> status = new HashMap<>();
            status.put("status", "ok");
            status.put("serverTime", LocalDateTime.now().toString());
            
            try {
                App.reconnect();
                boolean dbConnected = (App.conn != null && !App.conn.isClosed());
                status.put("database", dbConnected ? "connected" : "disconnected");
            } catch (Exception e) {
                status.put("database", "error: " + e.getMessage());
            }

            sendResponse(exchange, 200, status);
        }
    }

    static class ExternalJobsHandler implements HttpHandler {
        private final String RAPID_API_KEY = "154dcef665msh605d8dc540fb4e0p14ca9bjsn72d323aeeaeb"; // USER: Replace with
                                                                                                   // your actual key

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                String query = "developer";
                String rawQuery = exchange.getRequestURI().getQuery();
                if (rawQuery != null && rawQuery.contains("query=")) {
                    query = rawQuery.split("query=")[1].split("&")[0];
                }
                System.out.println("Received external jobs search request for: " + query);

                try {
                    String encodedQuery = java.net.URLEncoder.encode(query, StandardCharsets.UTF_8);
                    HttpClient client = HttpClient.newHttpClient();
                    // Using Remotive API - Free and No Key Required!
                    HttpRequest request = HttpRequest.newBuilder()
                            .uri(URI.create("https://remotive.com/api/remote-jobs?search=" + encodedQuery))
                            .GET()
                            .build();

                    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                    System.out.println("Remotive API Response Status: " + response.statusCode());
                    
                    exchange.getResponseHeaders().set("Content-Type", "application/json");
                    byte[] bytes = response.body().getBytes(StandardCharsets.UTF_8);
                    exchange.sendResponseHeaders(response.statusCode(), bytes.length);
                    OutputStream os = exchange.getResponseBody();
                    os.write(bytes);
                    os.close();
                } catch (Exception e) {
                    e.printStackTrace();
                    sendError(exchange, 500, "Failed to fetch external jobs: " + e.getMessage());
                }
            }
        }
    }

    private static boolean checkAuth(HttpExchange exchange) throws IOException {
        if (App.logginUser == null) {
            sendError(exchange, 401, "Authentication required. Please login first.");
            return false;
        }
        return true;
    }

    private static void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
    }

    private static void sendResponse(HttpExchange exchange, int statusCode, Object data) throws IOException {
        String response = gson.toJson(data);
        byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(statusCode, bytes.length);
        OutputStream os = exchange.getResponseBody();
        os.write(bytes);
        os.close();
    }

    private static void sendError(HttpExchange exchange, int statusCode, String message) throws IOException {
        Map<String, String> error = new HashMap<>();
        error.put("error", message);
        sendResponse(exchange, statusCode, error);
    }
}
