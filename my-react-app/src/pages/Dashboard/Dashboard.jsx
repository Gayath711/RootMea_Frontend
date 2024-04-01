import React from "react";
import DashboardMainArea from "../../components/DashboardMainArea/DashboardMainArea";
import Panel from "../../components/Panel/Panel";
import { useWindowSize } from "../../components/Utils/windowResize";
import GreetingCard from "../../components/GreetingCard/GreetingCard";
import TopStats from "../../components/TopStatsCard/TopStatsCard";
import SocialVital from "../../components/SocialVital/SocialVital";
import MyPanel from "../../components/MyPanel/MyPanel";
import CalendarCard from "../../components/Calendar1/Calendar";
import Appointments from "../../components/Appointment/Appointment";
import ClientGoal from "../../components/ClientGoal/ClientGoal";
import NotificationCard from "../../components/NotificationCard/NotificationCard";
import Activities from "../../components/Activities/Activities";
import PriorityList from "../../components/PriorityList/PriorityList";
import PriorityListMyPrograms from "../../components/PriorityListMyPrograms/PriorityListMyPrograms";
import ReferralPrograms from "../../components/ReferralPrograms/ReferralPrograms";
import AppointmentCalendar from "../../components/AppointmentCalendar/AppointmentCalendar";
import Encounters from "../../components/Encounters/Encounters";

function Dashboard({ onLogout }) {
  const { width } = useWindowSize();
  console.log(width);

  return (
    <>
      {
        width > 600 && width < 1100 &&
        <div className="mx-2.5 sm:mx-0 grid gap-y-7 !mr-3">
          <div className="grid sm:grid-cols-11 grid-cols-1 sm:gap-7 gap-y-3">
            <div className="sm:col-span-11 col-span-full">
              <GreetingCard />
            </div>
            <div className="sm:col-span-11 flex flex-wrap justify-between gap-4">
              <TopStats />
              <SocialVital />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:gap-7 gap-y-3">
            <MyPanel />
            <CalendarCard />
            <Appointments />
          </div>
          <div className="grid grid-cols-1 sm:gap-7 gap-y-3">
            <div className="col-span-8 grid grid-cols-1 gap-y-7">
              <ClientGoal />
              <PriorityList />
              <PriorityListMyPrograms />
              <ReferralPrograms />
              <AppointmentCalendar />
              <Encounters />
            </div>
            <div className="col-span-8 grid grid-cols-1 gap-y-7">
              <Activities /> 
              <NotificationCard />
            </div>
          </div>
        </div>
      }
      {
        (width < 600 || width > 1100) &&
        <div className="mx-2.5 sm:mx-0 grid gap-y-3">
          <div className="grid sm:grid-cols-11 grid-cols-1 sm:gap-4 gap-y-3">
            <GreetingCard />
            <TopStats />
            <SocialVital />
          </div>
          <div className="grid sm:grid-cols-11 grid-cols-1 sm:gap-4 gap-y-3">
            <MyPanel />
            <CalendarCard />
          </div>
          {width < 600 && <Appointments />}
          <div className="grid sm:grid-cols-11 grid-cols-1 sm:gap-4 gap-y-3">
            <div className="col-span-8 grid grid-cols-1 gap-y-4">
              <ClientGoal />
              <PriorityList />
              <PriorityListMyPrograms />
              <ReferralPrograms />
              <AppointmentCalendar />
              <Encounters />
            </div>
            <div className="col-span-3 grid grid-cols-1 gap-y-3">
              {width > 600 ? (
                <>
                  <NotificationCard />
                  <Appointments />
                  <Activities />
                </>
              ) : (
                <>
                  <Activities />
                  <NotificationCard />
                </>

              )}
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Dashboard;
