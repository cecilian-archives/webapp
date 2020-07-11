import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
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
  datePicker: {
    margin: theme.spacing(1, 2, 2, 1),
  },
}));

const GET_ARCHIVE_ITEMS = gql`
  query($start: Date!, $end: Date!) {
    getArchiveItemsByDateRange(startDate: $start, endDate: $end) {
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
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);

  const { loading, error, data } = useQuery(GET_ARCHIVE_ITEMS, {
    variables: {
      start,
      end,
    },
    returnPartialData: true,
    skip: !start || !end,
  });

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
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <KeyboardDatePicker
          openTo="year"
          views={["year", "month", "date"]}
          format="yyyy-MM-dd"
          clearable
          minDate={new Date("1952-10-18")}
          maxDate={end || new Date()}
          id="startDate"
          label="Start Date"
          value={start}
          onChange={(date) => setStart(date)}
          inputVariant="outlined"
          placeholder="The date to begin your search"
          className={classes.datePicker}
        />
        <KeyboardDatePicker
          openTo="year"
          views={["year", "month", "date"]}
          format="yyyy-MM-dd"
          clearable
          minDate={start || new Date("1952-10-18")}
          maxDate={new Date()}
          id="endDate"
          label="End Date"
          value={end}
          onChange={(date) => setEnd(date)}
          inputVariant="outlined"
          placeholder="The date to finish your search"
          className={classes.datePicker}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={10}
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        {loading ? (
          <pre>Loading...</pre>
        ) : error || !data?.getArchiveItemsByDateRange?.length ? (
          <pre>No items to show for this date range</pre>
        ) : (
          data.getArchiveItemsByDateRange
            ?.slice()
            ?.sort(sortByAssociatedDate)
            ?.map((item) => <ArchiveItemCard key={item.id} item={item} />)
        )}
      </Grid>
    </Grid>
  );
};

export default PrototypeDemo;
