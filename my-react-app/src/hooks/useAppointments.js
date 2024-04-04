import React, { useState, useEffect } from "react";
import axios from "axios";
import apiURL from ".././apiConfig";

function useAppointments() {
  // Event List
  const [internalEvents, setInternalEvents] = useState([]);
  const [externalEvents, setExternalEvents] = useState([]);

  // Loading State
  const [internalEventsLoading, setInternalEventsLoading] = useState(true);
  const [externalEventsLoading, setEnternalEventsLoading] = useState(true);

  function fetchGoogleEvents() {
    axios
      .get(`${apiURL}/rest/v1/calendar/events/`)
      .then((response) => {
        setEnternalEventsLoading(true);

        let external = response.data.data
          ? response.data.data.map((event) => {
              return {
                isExternal: true,
                ...event,
              };
            })
          : [];
        setExternalEvents(external);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching calendar events:", error);
      })
      .finally(() => {
        setEnternalEventsLoading(false);
      });
  }

  function fetchInternalEvents() {
    axios
      .get(`${apiURL}/django/calendar/events/`)
      .then((response) => {
        setInternalEventsLoading(true);

        let internal = response.data
          ? response.data.map((event) => {
              return {
                isExternal: false,
                summary: event.summary,
                start: {
                  dateTime: event.start_datetime,
                  // timeZone: "Asia/Kolkata",
                },
                end: {
                  dateTime: event.end_datetime,
                  // timeZone: "Asia/Kolkata", // need to check
                },
              };
            })
          : [];

        setInternalEvents(internal);
      })
      .catch((error) => {
        console.error("Error fetching calendar events:", error);
      })
      .finally(() => {
        setInternalEventsLoading(false);
      });
  }

  function fetchEvents() {
    fetchGoogleEvents();
    fetchInternalEvents();
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    internalEventsLoading,
    externalEventsLoading,
    internalEvents,
    externalEvents,
    eventList: [...internalEvents, ...externalEvents],
    fetchGoogleEvents,
    fetchInternalEvents,
    fetchEvents,
  };
}

export default useAppointments;
