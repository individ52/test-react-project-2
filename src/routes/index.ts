import React from "react";
import CalendarPage from "../pages/CalendarPage";
import LoginPage from "../pages/LoginPage";


interface IRoute {
    path: string;
    element: React.ComponentType;
    label: string;
}

export enum RouteNames {
    LOGIN = "/login",
    CALENDAR = "/calendar",
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.LOGIN, element: LoginPage, label: "Login" }
];

export const privateRoutes: IRoute[] = [
    { path: RouteNames.CALENDAR, element: CalendarPage, label: "Calendar" }
];