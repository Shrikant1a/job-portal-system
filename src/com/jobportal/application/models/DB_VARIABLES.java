package com.jobportal.application.models;

public interface DB_VARIABLES {
    // Environment-based config (preferred for deployment)
    static String getEnv(String key, String defaultValue) {
        String value = System.getenv(key);
        return (value != null) ? value : defaultValue;
    }

    public static String 
    DB = getEnv("DB_NAME", "buif8mprfkfyazp9pvrn"),
    HOST = getEnv("DB_HOST", "buif8mprfkfyazp9pvrn-mysql.services.clever-cloud.com"),
    PASSWORD = getEnv("DB_PASSWORD", "BgFDUEdqxhvULYMjdWIa"),
    PORT = getEnv("DB_PORT", "3306"),
    USER = getEnv("DB_USER", "uyna0wp8ir8ws061"),
    VERSION = "8.0";

    // Computed URI
    public static String URI = "mysql://" + USER + ":" + PASSWORD + "@" + HOST + ":" + PORT + "/" + DB;
}
