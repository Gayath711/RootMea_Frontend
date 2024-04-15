import { useState, useEffect } from "react";
import axios from "axios";
import apiURL from ".././apiConfig";

function useAppointments() {
  const [internalEvents, setInternalEvents] = useState([]);
  const [externalEvents, setExternalEvents] = useState([]);
  const [internalEventsLoading, setInternalEventsLoading] = useState(true);
  const [externalEventsLoading, setExternalEventsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchGoogleEvents = async () => {
    try {
      const response = await axios.get(`${apiURL}/rest/v1/calendar/events/`);
      const external = response.data.data
        ? response.data.data.map((event) => ({
            isExternal: true,
            ...event,
          }))
        : [];
      setExternalEvents(external);
    } catch (error) {
      console.error("Error fetching calendar events:", error);
    } finally {
      setExternalEventsLoading(false);
    }
  };

  const fetchInternalEvents = async () => {
    try {
      const response = await axios.get(`${apiURL}/django/calendar/events/`);
      const internal = response.data
        ? response.data.map((event) => ({
            isExternal: false,
            summary: event.summary,
            start: {
              dateTime: event.start_datetime,
            },
            end: {
              dateTime: event.end_datetime,
            },
            htmlLink: event.meeting_link,
          }))
        : [];
      setInternalEvents(internal);
    } catch (error) {
      console.error("Error fetching calendar events:", error);
    } finally {
      setInternalEventsLoading(false);
    }
  };

  const fetchEvents = async () => {
    await Promise.all([fetchGoogleEvents(), fetchInternalEvents()]);
  };

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
