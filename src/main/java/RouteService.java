package com.transportecity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class RouteService {
    private List<Route> routes;

    public RouteService() {
        this.routes = new ArrayList<>();
        // Initialize with some default routes
        routes.add(new Route(1, "Ruta Centro", "bus", 
            List.of("Plaza Mayor", "Mercado Central", "Parque Principal"),
            List.of("Calle Mayor", "Avenida Central", "Paseo del Parque", "Calle del Comercio"),
            "https://www.google.com/maps/d/embed?mid=1_FjGYhKgbX6LCQ6lGfNTvJQwdCE&ehbc=2E312F",
            "https://www.google.com/maps/d/embed?mid=1YuBrDfOHMY2YQcTdc3H6MKHHiLw&ehbc=2E312F"));
        routes.add(new Route(2, "Ruta Universitaria", "train", 
            List.of("Estación Central", "Campus Norte", "Campus Sur"),
            List.of("Avenida de la Universidad", "Calle de las Ciencias", "Paseo de los Estudiantes"),
            "https://www.google.com/maps/d/embed?mid=1Xbk_b9lhxVsYOhl9yrKUmNT5V5M&ehbc=2E312F",
            "https://www.google.com/maps/d/embed?mid=1_FjGYhKgbX6LCQ6lGfNTvJQwdCE&ehbc=2E312F"));
        routes.add(new Route(3, "Ruta Parques", "bike", 
            List.of("Parque del Oeste", "Jardín Botánico", "Parque del Este"),
            List.of("Avenida de los Parques", "Calle Verde", "Paseo de las Flores", "Camino del Bosque"),
            "https://www.google.com/maps/d/embed?mid=1YuBrDfOHMY2YQcTdc3H6MKHHiLw&ehbc=2E312F",
            "https://www.google.com/maps/d/embed?mid=1Xbk_b9lhxVsYOhl9yrKUmNT5V5M&ehbc=2E312F"));
    }

    public List<Route> getAllRoutes() {
        return routes;
    }

    public Route getRouteById(int id) {
        return routes.stream()
                     .filter(route -> route.getId() == id)
                     .findFirst()
                     .orElse(null);
    }

    public List<Route> searchRoutes(String searchTerm) {
        return routes.stream()
                     .filter(route -> route.getName().toLowerCase().contains(searchTerm.toLowerCase()))
                     .collect(Collectors.toList());
    }

    public void addRoute(Route route) {
        routes.add(route);
    }
}