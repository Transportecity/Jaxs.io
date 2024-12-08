package com.transportecity;

import java.util.List;

public class Route {
    private int id;
    private String name;
    private String type;
    private List<String> stops;
    private List<String> streets;
    private String mapLinkIda;
    private String mapLinkVuelta;

    // Constructor
    public Route(int id, String name, String type, List<String> stops, List<String> streets, String mapLinkIda, String mapLinkVuelta) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.stops = stops;
        this.streets = streets;
        this.mapLinkIda = mapLinkIda;
        this.mapLinkVuelta = mapLinkVuelta;
    }

    // Getters and setters
    // ... (implement getters and setters for all fields)
}