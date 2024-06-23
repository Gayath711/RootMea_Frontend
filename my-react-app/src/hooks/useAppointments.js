import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import apiURL from ".././apiConfig";

function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [internalEvents, setInternalEvents] = useState([]);
  const [externalEvents, setExternalEvents] = useState([]);
  const [internalEventsLoading, setInternalEventsLoading] = useState(true);
  const [externalEventsLoading, setExternalEventsLoading] = useState(true);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setAppointmentsLoading(true);
      const response = await axios.get(`${apiURL}/appointments`);
      let eventData = response.data.map((event) => {
        const date = new Date(event.start_time);
        // Add 30 minutes
        date.setMinutes(date.getMinutes() + 30);
        // Convert back to ISO string
        const endDateTime = date.toISOString();

        return {
          ...event,
          isExternal: false,
          summary: event.meeting_title,
          start: {
            dateTime: event.start_time,
          },
          end: {
            dateTime: endDateTime,
          },
        };
      });
      setAppointments(eventData);
    } catch (error) {
      console.error("Error fetching calendar appointments:", error);
    } finally {
      setAppointmentsLoading(false);
    }
  };

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
            fullEvent: event,
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

  const combinedEventList = useMemo(() => {
    return [...internalEvents, ...externalEvents];
  }, [internalEvents, externalEvents])

  return {
    internalEventsLoading,
    externalEventsLoading,
    appointmentsLoading,
    internalEvents,
    externalEvents,
    eventList: combinedEventList,
    appointmentsList: appointments,
    fetchGoogleEvents,
    fetchInternalEvents,
    fetchEvents,
    fetchAppointments,
  };
}

export default useAppointments;
