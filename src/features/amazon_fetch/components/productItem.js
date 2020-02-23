import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import get from "lodash/get";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    marginTop: 5
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 100,
    height: 100,
    backgroundSize: "contain"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

export default ({ Products, Manufacturers, Images }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={get(Images, ["0", "URL"])}
        title={get(Images, ["0", "Caption"])}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <div style={{ fontSize: "0.95rem" }}>
            {get(Products, ["0", "Name"], "").substring(0, 30) + "..."}
          </div>
          <Typography variant="subtitle1" color="textSecondary">
            {get(Manufacturers, ["0", "Name"])}
          </Typography>
        </CardContent>
        <div className={classes.controls}></div>
      </div>
    </div>
  );
};
