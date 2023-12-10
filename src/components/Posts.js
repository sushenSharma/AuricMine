// Posts.js

import React from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  FormControl,
  Form,
} from "react-bootstrap";
import MediaCard from "./MediaCard";
import Grid from "@mui/material/Grid";

const Posts = () => {
  return (
    <Grid container spacing={10.4} sx={{ width: "100%", padding: 5 }}>
      <Grid item xs="auto">
        <MediaCard />
      </Grid>
      <Grid item xs="auto">
        <MediaCard />
      </Grid>
      <Grid item xs="auto">
        <MediaCard />
      </Grid>
      <Grid item xs="auto">
        <MediaCard />
      </Grid>
    </Grid>
  );
};

export default Posts;
