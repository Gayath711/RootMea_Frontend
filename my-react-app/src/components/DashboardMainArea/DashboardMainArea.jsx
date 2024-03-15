import GreetingCard from "../GreetingCard/GreetingCard";
import MyPanel from "../MyPanel/MyPanel";
import TopStats from "../TopStatsCard/TopStatsCard";
import ClientGoal from "../ClientGoal/ClientGoal";
import NotificationCard from "../NotificationCard/NotificationCard";
import PriorityList from "../PriorityList/PriorityList";
import ReferralPrograms from "../ReferralPrograms/ReferralPrograms";

const DashboardMainArea = () => {
  return (
    <div className="space-y-8 flex flex-col justify-between">
      <div className="flex justify-between">
        <GreetingCard />
        <TopStats />
      </div>
      <div>
        <MyPanel />
      </div>
      <div className="flex justify-between">
        <ClientGoal />
        <NotificationCard />
      </div>
      <div className="flex justify-between">
        <PriorityList title={"Priority Lists"} type={"priorityList"} />
        <PriorityList
          title={"Priority Lists in my Programs"}
          type={"priorityListPrograms"}
        />
      </div>
      <div>
        <ReferralPrograms />
      </div>
    </div>
  );
};

export default DashboardMainArea;
