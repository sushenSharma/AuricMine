import Grid from "@mui/material/Grid";
import React from "react";
import MediaCard from "../../../components/MediaCard";

const BlogPosts = () => {
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

export default BlogPosts;
