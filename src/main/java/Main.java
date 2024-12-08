package com.transportecity;

import static spark.Spark.*;
import com.google.gson.Gson;

public class Main {
    public static void main(String[] args) {
        RouteService routeService = new RouteService();
        Gson gson = new Gson();

        port(8080);

        get("/routes", (req, res) -> {
            res.type("application/json");
            return gson.toJson(routeService.getAllRoutes());
        });

        get("/routes/:id", (req, res) -> {
            res.type("application/json");
            int id = Integer.parseInt(req.params(":id"));
            Route route = routeService.getRouteById(id);
            if (route != null) {
                return gson.toJson(route);
            } else {
                res.status(404);
                return "Route not found";
            }
        });

        get("/search", (req, res) -> {
            res.type("application/json");
            String searchTerm = req.queryParams("term");
            return gson.toJson(routeService.searchRoutes(searchTerm));
        });

        post("/routes", (req, res) -> {
            res.type("application/json");
            Route newRoute = gson.fromJson(req.body(), Route.class);
            routeService.addRoute(newRoute);
            res.status(201);
            return gson.toJson(newRoute);
        });
    }
}