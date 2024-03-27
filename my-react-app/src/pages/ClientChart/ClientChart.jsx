import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import ClientChartTopBar from "../../components/ClientChartTopBar/ClientChartTopBar";
import ClientProfile from "../../components/Clientprofile1/ClientProfile";
import SocialVitalSigns from "../../components/SocialVitalSigns/SocialVitalSigns";
import EncounterNotes from "../../components/EncounterNotes/EncounterNotes";
import PriorityLists from "../../components/PriorityListsClientChart/PrioriyLists";
import MedicalVitalSigns from "../../components/MedicalVitalSigns/MedicalVitalSigns";
import CarePlan from "../../components/CarePlan/CarePlan";
import Documents from "../../components/Documents/Documents";
import Forms from "../../components/Forms/Forms";
import Appointments from "../../components/AppointmentsClientChart/Appointments";
import Referrals from "../../components/Referrals/Referrals";
import Diagnoses from "../../components/Diagnoses/Diagnoses";
import Medications from "../../components/Medications/Medications";
import LabResults from "../../components/LabResults/LabResults";

function ClientChart() {
  const { clientId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="flex flex-col space-y-8">
      <PageTitle clientId={clientId} title={"Client Chart"} />
      <ClientChartTopBar clientId={clientId} />
      <ClientProfile clientId={clientId} />
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-5">
          <SocialVitalSigns clientId={clientId} />
        </div>
        <div className="col-span-7">
          <EncounterNotes clientId={clientId} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-7">
          <PriorityLists clientId={clientId} />
        </div>
        <div className="col-span-5">
          <MedicalVitalSigns clientId={clientId} />
        </div>
      </div>
      <CarePlan clientId={clientId} />
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-7">
          <Documents clientId={clientId} />
        </div>
        <div className="col-span-5">
          <Forms clientId={clientId} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-7">
          <Appointments clientId={clientId} />
        </div>
        <div className="col-span-5">
          <Referrals clientId={clientId} />
        </div>
      </div>
      <Diagnoses clientId={clientId} />
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-7">
          <Medications clientId={clientId} />
        </div>
        <div className="col-span-5">
          <LabResults clientId={clientId} />
        </div>
      </div>
    </div>
  );
}

export default ClientChart;
