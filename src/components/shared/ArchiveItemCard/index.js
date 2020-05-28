import React from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import ArchiveItemImage from "./ArchiveItemImage";
import useHover from "../../../hooks/useHover";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 0),
    },
  },
  cardRoot: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    width: "65%",
    paddingBottom: theme.spacing(2),
  },
  noUnderline: {
    textDecoration: "none",
  },
}));

const acquisitionVerb = (method) =>
  method === "TRANSCRIPTION"
    ? "Transcribed"
    : method === "SCAN"
    ? "Scanned"
    : "Archived";

const ArchiveItemCard = ({ item }) => {
  const classes = useStyles();
  const [hoverRef, isHovered] = useHover();

  const itemUrl = item.files
    .filter((file) => file.kind === "PRIMARY")
    .map((file) => file.ssl_url)[0];

  return (
    <Grid item xs={12} md={6} lg={4} className={classes.gridRoot}>
      <a
        href={itemUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.noUnderline}
      >
        <Card ref={hoverRef} className={classes.cardRoot}>
          <ArchiveItemImage item={item} isHovered={isHovered} />
          <CardContent className={classes.content}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.archiveId}
            </Typography>
            {item.associatedDate && (
              <Typography component="h5" variant="h5">
                {format(item.associatedDate, "EEEE do MMMM yyyy")}
              </Typography>
            )}
            {(item.acquiredBy || item.acquiredByFreeform) && (
              <Typography variant="subtitle2" color="textSecondary">
                {acquisitionVerb(item.acquisitionMethod)} by:
                <br />
                {item.acquiredBy?.name || item.acquiredByFreeform}
              </Typography>
            )}
          </CardContent>
        </Card>
      </a>
    </Grid>
  );
};

export default ArchiveItemCard;
