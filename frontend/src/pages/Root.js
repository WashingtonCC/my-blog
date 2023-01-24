import React from "react";
import classes from "./Root.module.css";
import { Outlet, NavLink } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <header className={classes.header}>
        <nav className={classes.nav}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? classes.active : "")}
          >
            <h3>Home</h3>
          </NavLink>
          <NavLink
            to="posts"
            className={({ isActive }) => (isActive ? classes.active : "")}
            end
          >
            <h3>Posts</h3>
          </NavLink>
          <NavLink
            to="posts/new"
            className={({ isActive }) => (isActive ? classes.active : "")}
          >
            <h3>New Post</h3>
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default RootLayout;
