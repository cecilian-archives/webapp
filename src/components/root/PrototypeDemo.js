import React from "react";
import { Grid, Typography } from "@material-ui/core";
import ArchiveItemCard from "../shared/ArchiveItemCard/";
import { gql, useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    [theme.breakpoints.only("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  pageTitleContainer: {
    margin: theme.spacing(2, 0),
  },
}));

const GET_ARCHIVE_ITEMS = gql`
  {
    getArchiveItems {
      id
      archiveId
      type
      acquisitionMethod
      collection
      associatedDate
      notes
      acquiredBy {
        name
      }
      acquiredByFreeform
      uploadedByFreeform
      createdAt
      updatedAt
      files {
        id
        kind
        name
        ssl_url
      }
    }
  }
`;

const sortByAssociatedDate = (itemA, itemB) => {
  const dateA = itemA.associatedDate;
  const dateB = itemB.associatedDate;
  const collectionA = itemA.collection;
  const collectionB = itemB.collection;
  if (!dateA) return 1;
  if (!dateB) return -1;
  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;
  if (collectionA < collectionB) return -1;
  if (collectionA > collectionB) return 1;
  return 0;
};

const PrototypeDemo = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_ARCHIVE_ITEMS);

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
        <Typography variant="h4">Minutes Prototype</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={10}
        md={8}
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        {loading ? (
          <pre>Loading...</pre>
        ) : error ? (
          <pre>{error}</pre>
        ) : (
          data.getArchiveItems
            .slice()
            .sort(sortByAssociatedDate)
            .map((item) => <ArchiveItemCard key={item.id} item={item} />)
        )}
      </Grid>
    </Grid>
  );
};

export default PrototypeDemo;
