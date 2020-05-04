import React from "react";
import { gql } from "@apollo/client";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import FaceIcon from "@material-ui/icons/Face";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import DateRangeIcon from "@material-ui/icons/DateRange";

export const typeOrder = ["PERSON", "YEAR", "EVENT", "ROLE"];
export const eventTypeOrder = ["SHOW", "EVENT", "ANNIVERSARY"];
export const roleTypeOrder = [
  "COMMITTEE",
  "PRODUCTION",
  "PERFORMANCE",
  "SOCIETY",
];

export const sortTags = (tagList) => {
  const sortedList = [...tagList].sort((tagA, tagB) => {
    if (tagA.type === "EVENT" && tagB.type === "EVENT") {
      if (
        eventTypeOrder.indexOf(tagA.event.type) <
        eventTypeOrder.indexOf(tagB.event.type)
      )
        return -1;
      if (
        eventTypeOrder.indexOf(tagA.event.type) >
        eventTypeOrder.indexOf(tagB.event.type)
      )
        return 1;
    }
    if (tagA.type === "ROLE" && tagB.type === "ROLE") {
      if (
        roleTypeOrder.indexOf(tagA.role.type) <
        roleTypeOrder.indexOf(tagB.role.type)
      )
        return -1;
      if (
        roleTypeOrder.indexOf(tagA.role.type) >
        roleTypeOrder.indexOf(tagB.role.type)
      )
        return 1;
    }

    if (typeOrder.indexOf(tagA.type) < typeOrder.indexOf(tagB.type)) return -1;
    if (typeOrder.indexOf(tagA.type) > typeOrder.indexOf(tagB.type)) return 1;

    if (tagA[tagA.type.toLowerCase()].name < tagB[tagB.type.toLowerCase()].name)
      return -1;
    if (tagA[tagA.type.toLowerCase()].name > tagB[tagB.type.toLowerCase()].name)
      return 1;

    return 0;
  });
  return sortedList;
};

export const tagTypeProperties = {
  PERSON: {
    icon: <FaceIcon />,
    // TODO: icon could be profile pic of referenced person
    colour: "deepBlue",
    label: "Person",
    query: gql`
      {
        options: getAllCecilians {
          id
          name
        }
      }
    `,
    checkEquality: (newTag, existingTag) =>
      existingTag.type === "PERSON" &&
      existingTag.person.id === newTag.person.id,
  },
  YEAR: {
    icon: <DateRangeIcon />,
    colour: "brightOrange",
    label: "Year",
    query: gql`
      {
        options: getAllYears {
          id
          name
          shows {
            id
            type
            name
            startDate
          }
        }
      }
    `,
    checkEquality: (newTag, existingTag) =>
      existingTag.type === "YEAR" && existingTag.year.id === newTag.year.id,
  },
  EVENT: {
    icon: <EventSeatIcon />,
    colour: {
      SHOW: "brightRed",
      EVENT: "brightPurple",
      ANNIVERSARY: "deepPurple",
    },
    label: "Event",
    query: gql`
      {
        options: getAllEvents {
          id
          type
          name
          startDate
          year {
            id
            name
          }
        }
      }
    `,
    checkEquality: (newTag, existingTag) =>
      existingTag.type === "EVENT" &&
      existingTag.event.id === newTag.event.id &&
      (existingTag.year || newTag.year
        ? existingTag.year?.id === newTag.year?.id
        : true),
  },
  ROLE: {
    icon: <EmojiPeopleIcon />,
    colour: {
      COMMITTEE: "brightPink",
      PRODUCTION: "deepGreen",
      PERFORMANCE: "brightGreen",
      SOCIETY: "brightBlue",
    },
    label: "Role",
    query: gql`
      {
        options: getAllRoles {
          id
          type
          name
          event {
            id
            name
            year {
              id
              name
            }
          }
        }
      }
    `,
    checkEquality: (newTag, existingTag) => {
      if (existingTag.type !== "ROLE") return false;
      if (existingTag.role.id !== newTag.role.id) return false;

      if (
        !(existingTag.year || newTag.year || existingTag.event || newTag.event)
      )
        return true;

      if (existingTag.year || newTag.year) {
        if (existingTag.year?.id === newTag.year?.id) return true;
      }
      if (existingTag.event || newTag.event) {
        if (existingTag.event?.id === newTag.event?.id) return true;
        if (existingTag.event?.year || newTag.event?.year) {
          if (existingTag.event?.year?.id === newTag.year?.id) return true;
          if (existingTag.year?.id === newTag.event?.year?.id) return true;
        }
      }

      return false;
    },
  },
};

const eventYearDisplayOnly = (tag) => tag?.event?.year?.name;
const roleEventDisplayOnly = (tag) => tag?.role?.event?.name;
const roleYearDisplayOnly = (tag) =>
  tag?.event?.year?.name || tag.role?.event?.year?.name;

export const sanitiseTag = (tag) => {
  if (tag.type === "EVENT") {
    if (tag.year && eventYearDisplayOnly(tag)) {
      const { year, ...newEventTag } = tag;
      return newEventTag;
    }
  }
  if (tag.type === "ROLE") {
    if (
      tag.event &&
      roleEventDisplayOnly(tag) &&
      tag.year &&
      roleYearDisplayOnly(tag)
    ) {
      const { event, year, ...newTag } = tag;
      return newTag;
    }
    if (tag.event && roleEventDisplayOnly(tag)) {
      const { event, ...newTag } = tag;
      return newTag;
    }
    if (tag.year && roleYearDisplayOnly(tag)) {
      const { year, ...newTag } = tag;
      return newTag;
    }
  }
  return tag;
};
