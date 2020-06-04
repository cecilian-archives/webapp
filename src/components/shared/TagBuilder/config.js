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

export const optionSort = (type) => (optA, optB) => {
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

    if (tagA.type === tagB.type)
      return optionSort(tagA.type)(
        tagA[tagA.type.toLowerCase()],
        tagB[tagB.type.toLowerCase()]
      );

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
    description: "Tag a Cecilian or other person by name",
    query: gql`
      {
        options: getAllCecilians {
          id
          name
          activeFrom
          activeTo
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
    description: "Tag the Cecilian year (AGM to AGM)",
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
    description: "Including Shows, Anniversaries, Dinner Dances etc.",
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
    description:
      "Including Committee Roles, Production Roles, On-Stage Roles and Other Society Roles",
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
