import React from "react";
import { Autocomplete } from "@material-ui/lab";
import {
  TextField,
  CircularProgress,
  IconButton,
  ListSubheader,
  Collapse,
} from "@material-ui/core";
import ReloadIcon from "@material-ui/icons/Replay";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useLazyQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { format } from "date-fns";
import { tagTypeProperties, eventTypeOrder, roleTypeOrder } from "./config";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
  },
  groupLabel: {
    backgroundColor: theme.palette.background.paper,
    top: -8,
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  groupUl: {
    padding: 0,
    "& $option": {
      paddingLeft: 24,
    },
  },
  option: {},
  reloadButton: {
    padding: theme.spacing(1),
  },
}));

const optionSort = (type) => (optA, optB) => {
  if (type === "EVENT") {
    if (eventTypeOrder.indexOf(optA.type) < eventTypeOrder.indexOf(optB.type))
      return -1;
    if (eventTypeOrder.indexOf(optA.type) > eventTypeOrder.indexOf(optB.type))
      return 1;
    if (
      (optA.type === "SHOW" && optB.type === "SHOW") ||
      (optA.type === "ANNIVERSARY" && optB.type === "ANNIVERSARY")
    ) {
      // TODO: change this to use event.startDate instead
      // This way does not correctly order weekend/main shows
      if (optA?.year?.name < optB?.year?.name) return 1;
      if (optA?.year?.name > optB?.year?.name) return -1;
    }
  }
  if (type === "ROLE") {
    if (roleTypeOrder.indexOf(optA.type) < roleTypeOrder.indexOf(optB.type))
      return -1;
    if (roleTypeOrder.indexOf(optA.type) > roleTypeOrder.indexOf(optB.type))
      return 1;
    if (optA.type === "PERFORMANCE" && optB.type === "PERFORMANCE") {
      if (optA?.event?.name < optB?.event?.name) return -1;
      if (optA?.event?.name > optB?.event?.name) return 1;
    }
  }
  if (optA.name < optB.name) return -1;
  if (optA.name > optB.name) return 1;
  return 0;
};

const getOptionLabel = (type) => (option) => {
  switch (type) {
    case "ROLE":
      return option
        ? option.event
          ? option.event.year
            ? `${option.event.name} (${option.event.year.name}) - ${option.name}`
            : `${option.name} - ${option.event.name}`
          : `${option.name}`
        : "";
    case "EVENT":
      const eventYear = option.year ? ` (${option.year.name})` : "";
      return option ? `${option.name}${eventYear}` : "";
    case "YEAR":
      const showList =
        option.shows?.length > 0
          ? ` (${option.shows
              .slice()
              .sort(optionSort("EVENT"))
              .map((show) => show.name)
              .join("; ")})`
          : "";
      return option ? `${option.name}${showList}` : "";
    case "PERSON":
      const activeFromYear =
        option.activeFrom !== null ? format(option.activeFrom, "yyyy") : null;
      const activeToYear =
        option.activeTo !== null ? format(option.activeTo, "yyyy") : null;
      const yearNote =
        activeFromYear || activeToYear
          ? ` (active ${activeFromYear || ""}-${activeToYear || ""})`
          : "";
      return option ? `${option.name}${yearNote}` : "";
    default:
      return option ? option.name : "";
  }
};

const OptionGroup = ({ group, children }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const groupDisplayTitles = {
    COMMITTEE: "Committee Roles",
    PRODUCTION: "Production Roles",
    PERFORMANCE: "On-Stage Roles",
    SOCIETY: "Other Society Roles",
    SHOW: "Shows",
    EVENT: "Other Events",
    ANNIVERSARY: "Anniversary Events",
  };
  return (
    <li>
      <ListSubheader
        onClick={() => setExpanded(!expanded)}
        className={classes.groupLabel}
        component="div"
      >
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        {groupDisplayTitles[group]}
      </ListSubheader>
      <Collapse in={expanded}>
        <ul className={classes.groupUl}>{children}</ul>
      </Collapse>
    </li>
  );
};

const ConnectedAutocomplete = ({
  type,
  required,
  tagToEdit,
  setTag,
  changeCallback,
  hidden,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [getOptions, { loading, error, data, refetch }] = useLazyQuery(
    tagTypeProperties[type].query
  );

  const typeRef = React.useRef(type);
  React.useEffect(() => {
    if (typeRef !== type) {
      setOptions([]);
      typeRef.current = type;
    }

    if (data && data.options) {
      const sortedOptions = data.options.slice().sort(optionSort(type));
      setOptions(sortedOptions);
    }
  }, [data, type]);

  const typeField = String(type).toLowerCase();

  const handleOpen = () => {
    !data &&
      getOptions({
        fetchPolicy: "cache-first",
        errorPolicy: "none",
        partialRefetch: true,
        returnPartialData: true,
        notifyOnNetworkStatusChange: true,
      });
    setOpen(true);
  };

  const handleRefetch = () => {
    refetch({
      fetchPolicy: "network-only",
      errorPolicy: "none",
      partialRefetch: true,
      returnPartialData: true,
      notifyOnNetworkStatusChange: true,
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (event, value, reason) => {
    if (Boolean(value)) {
      setTag({ ...tagToEdit, [typeField]: value });
    } else {
      const { [typeField]: removedValue, ...newTag } = tagToEdit;
      setTag(newTag);
    }
    changeCallback && changeCallback();
  };

  if (!type || hidden) return null;

  return (
    <Autocomplete
      className={classes.root}
      open={open}
      value={tagToEdit[typeField] || null}
      onChange={handleChange}
      onOpen={handleOpen}
      onClose={handleClose}
      openOnFocus={true}
      selectOnFocus={false}
      options={options}
      loading={loading}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={getOptionLabel(type)}
      groupBy={
        type === "EVENT" || type === "ROLE"
          ? (option) => option.type
          : undefined
      }
      renderGroup={(params) => (
        <OptionGroup
          key={params.group}
          group={params.group}
          children={params.children}
        />
      )}
      renderInput={(params) => (
        <TextField
          key={type}
          {...params}
          required={required}
          label={`${tagTypeProperties[type].label}${
            required ? "" : " (optional)"
          }`}
          variant="outlined"
          placeholder={
            error
              ? "Couldn't load. Use the button to try again."
              : "Type to search"
          }
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : error || (data && !tagToEdit[typeField]) ? (
                  <IconButton
                    onClick={handleRefetch}
                    className={classes.reloadButton}
                  >
                    <ReloadIcon />
                  </IconButton>
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default ConnectedAutocomplete;
