import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  pageContainer: {
    [theme.breakpoints.only("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  pageTitleContainer: {
    margin: theme.spacing(2, 0),
  },
  linkContainer: {
    overflowX: "clip",
  },
}));

const GET_ARCHIVE_ITEMS = gql`
  query {
    getArchiveItems {
      id
      type
      archiveId
      collection
      acquisitionMethod
      files {
        kind
        ssl_url
      }
      acquiredByFreeform
    }
  }
`;

const TempScanPage = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_ARCHIVE_ITEMS);

  const orderedItems =
    loading || error
      ? []
      : data.getArchiveItems
          .filter(
            item => item.type === "MINUTES" && item.acquisitionMethod === "SCAN"
          )
          .map(item => ({
            id: item.id,
            archiveId: item.archiveId,
            collection: item.collection,
            link: item.files.filter(file => file.kind === "PRIMARY")[0].ssl_url,
          }))
          .sort((itemA, itemB) =>
            itemA.archiveId < itemB.archiveId
              ? -1
              : itemA.archiveId > itemB.archiveId
              ? 1
              : 0
          );

  const allCollections =
    loading || error
      ? []
      : Array.from(new Set(orderedItems.map(item => item.collection)));

  return (
    <Grid
      className={classes.pageContainer}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid
        item
        xs={12}
        sm={10}
        md={8}
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
        className={classes.pageTitleContainer}
      >
        <Typography variant="h4">Scan Links</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={10}
        md={8}
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
        className={classes.pageTitleContainer}
      >
        {loading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : error ? (
          <Typography variant="body1">There has been an error.</Typography>
        ) : (
          <div className={classes.linkContainer}>
            {allCollections.map(collection => {
              const collectionItems = orderedItems.filter(
                item => item.collection === collection
              );
              return (
                <React.Fragment key={collection}>
                  <Typography variant="h4">{collection}</Typography>
                  <Typography variant="h6">
                    {collectionItems.length} items
                  </Typography>
                  {collectionItems.map(item => (
                    <pre key={item.id}>
                      {item.id}: {item.link}
                    </pre>
                  ))}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default TempScanPage;
