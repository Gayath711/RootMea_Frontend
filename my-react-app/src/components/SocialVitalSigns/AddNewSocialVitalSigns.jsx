import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

import PageTitle from "../PageTitle/PageTitle";
import ClientInformation from "./ClientInformation";
import SideBar from "./SideBar";
import SvsContent from "./SvsContent";
import SvsQAContent from "./SvsQAContent";
import Graph from "./Graph";
import Stats from "./Stats";
import apiURL from "../../apiConfig";

const AddNewSocialVitalSigns = () => {
  // const { clientId } = useParams();
  const clientId = 7;
  const [contentToShow, setContentToShow] = useState("");
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const housingData = {
    id: 4,
    current_residence_description: "Couch surfing",
    location_if_no_housing: "Oakland, Hayward ",
    slept_in_emergency_shelter: "Every Day",
    housing_risk: "High",
    client_id: 5,
  };

  const token = localStorage.getItem("access_token");
  // const location = useLocation();
  // const { domain } = location?.state;
  // console.log("domain", props.location?.state);
  // console.log("domain", domain);
  // const location = useLocation();
  // const { fromNotifications } = location.state || {};
  // console.log("fromNotifications", fromNotifications);

  const location = useLocation();
  const { state } = location;

  console.log("location.state", location.state);
  console.log("location.pathname", location.pathname);

  // useEffect(() => {
  //   axios
  //     .get(`${apiURL}/api/clientsvsquestions/`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       setDataLoaded(true);
  //       setQuestions(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching SVS Questions:", error);
  //     });

  //   axios
  //     .get(`${apiURL}/api/clientsvsfull/${clientId}/`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       // console.log("answers", response.data);
  //       setAnswers(response.data);
  //       console.log("answers", answers[0]);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching SVS Questions:", error);
  //     });
  // }, [clientId]);

  useEffect(() => {
    setContentToShow(location.state);
    console.log("contentToShow", contentToShow);
  }, []);

  let stages = [
    {
      stageIndex: 0,
      title: "Housing",
      qa: HOUSEING_QA,
    },
    {
      stageIndex: 1,
      title: "Food Access",
      qa: FOOD_ACCESS_QA,
    },
    {
      stageIndex: 2,
      title: "Financial Security",
      qa: FINANCIAL_SECURITY_QA,
    },
    {
      stageIndex: 3,
      title: "Education/Employment",
      qa: EDUCATION_EMPLOYEMENT_QA,
    },
    {
      stageIndex: 4,
      title: "Communication and Mobility",
      qa: COMMUNICATIONN_AND_MOBILITY_QA,
    },
    {
      stageIndex: 5,
      title: "Healthcare - Preventive",
      qa: HEALTHCARE_PREVENTIVE_QA,
    },
    {
      stageIndex: 6,
      title: "Healthcare - General Health",
      qa: HEALTHCARE_GENERAL_HEALTH_QA,
    },
    {
      stageIndex: 7,
      title: "Healthcare - Cardiovascular risk",
      qa: HEALTHCARE_CARDIOVASCULAR_RISK_QA,
    },
  ];

  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const goToPreviousStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(currentStageIndex - 1);
    }
  };

  const goToNextStage = () => {
    if (currentStageIndex < stages.length - 1) {
      setCurrentStageIndex(currentStageIndex + 1);
    }
  };

  const handleStage = (stageIndex) => {
    setCurrentStageIndex(stageIndex);
  };

  // const currentStage = stages[currentStageIndex];

  return (
    <div className="flex flex-col space-y-8">
      <PageTitle clientId={clientId} title={"Client Social Vital Signs"} />
      <ClientInformation />
      <div className="grid grid-cols-12 grid-rows-2 gap-x-4 p-2">
        <div className="col-span-4 space-y-8">
          <SideBar
            isQA={true}
            currentStage={stages[currentStageIndex]}
            stages={stages}
            handleStage={handleStage}
            contentToShow={contentToShow}
            setContentToShow={setContentToShow}
          />
        </div>

        <div className="col-span-8 space-y-8">
          <SvsQAContent
            isStart={stages[currentStageIndex].stageIndex === 0}
            isEnd={stages[currentStageIndex].stageIndex === stages.length - 1}
            stageIndex={stages[currentStageIndex].stageIndex}
            title={stages[currentStageIndex].title}
            questions={stages[currentStageIndex].qa}
            data={answers}
            goToPreviousStage={goToPreviousStage}
            goToNextStage={goToNextStage}
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewSocialVitalSigns;

let HOUSEING_QA = [
  {
    id: "housing-1",
    question: "Which of the following best describes the place you live now?",
    inputType: "Radio",
    options: [
      "Own a house or apartment",
      "Rent a house or apartment",
      "Hotel",
      "A Treatment Facility or Group Home",
      "An Emergency Shelter",
      "Couch Surfing",
      "I have no housing",
    ],
  },
  {
    id: "housing-2",
    question:
      "Over the past 3 months, did you ever have to sleep in an emergency shelter, in a vehicle, or on the street or park, or stay temporarily with friends because of the lack of housing?",
    inputType: "Radio",
    options: [
      "Never",
      "Once or Twice",
      "Several Days",
      "Most Days",
      "Every Day",
    ],
  },
  {
    id: "housing-review",
    question: "Review notes",
    inputType: "Text",
  },
];

let FOOD_ACCESS_QA = [
  {
    id: "food-access-1",
    question:
      "How many pieces or servings of fruit, any sort, do you eat on a typical day?",
    inputType: "Radio",
    options: ["None", "One", "Two", "Three or more"],
  },
  {
    id: "food-access-2",
    question:
      "How many portions of vegetables, excluding potatoes, do you eat on a typical day? ",
    inputType: "Text",
  },
  {
    id: "food-access-3",
    question: "Where do you get the majority of your food?",
    inputType: "Radio",
    options: [
      "Grocery",
      "Farmer's Market",
      "Fast food",
      "Corner store/convenience store",
      "Food pantry",
    ],
  },
  {
    id: "food-access-4",
    question:
      "Within the past 12 months, we worried whether our food would run out before we got money to buy more?",
    inputType: "Radio",
    options: ["Never", "Occasionally", "Sometimes", "Often"],
  },
  {
    id: "food-access-5",
    question:
      "Within the past 12 months, how often did your food not last and you didn't have money to get more?",
    inputType: "Radio",
    options: ["Never", "Sometimes", "Often"],
  },
  {
    id: "food-access-review",
    question: "Review notes",
    inputType: "Text",
  },
];

let EDUCATION_EMPLOYEMENT_QA = [
  {
    id: "education-employment-1",
    question: "What is the highest level of education you have completed?",
    inputType: "Radio",
    options: [
      "None",
      "Up to 8th grade",
      "Some high school",
      "High school diploma",
      "GED",
      "Trade/tech/vocational training",
      "Associate degree",
      "Some college",
      "Bachelor's degree",
      "Graduate/prof. degree",
    ],
  },
  {
    id: "education-employment-2",
    question:
      "Which of the following best describes your work situation today?",
    inputType: "Radio",
    options: [
      "I am employed full-time",
      "I am employed part-time",
      "I am self-employed",
      "I do odd jobs/occasional work",
      "I am unemployed, but looking for work",
      "I am unemployed but not looking for work",
      "I care for a child or family member full time",
      "I am temporarily disabled",
      "I am permanently disabled",
      "I am retired from work",
    ],
  },
  {
    id: "education-employment-3",
    question:
      "If you are employed full-time or part-time, what is the name and location of your employer?",
    inputType: "Text",
  },
  {
    id: "education-employment-4",
    question:
      "Are you currently participating in an educational or training program to improve your work opportunities?",
    inputType: "Radio",
    options: [
      "Yes",
      "No, but I would like to",
      "No, and I am not interested",
      "No, but I have in the past",
    ],
  },
  {
    id: "education-employment-5",
    question:
      "If you selected 'No, but I have in the past', what is the name of the program and the dates/years attended?",
    inputType: "Text",
  },
  {
    id: "education-employment-6",
    question:
      "If you selected 'No, but I have in the past', what is the name of the program and the dates/years attended?",
    inputType: "Text",
  },
  {
    id: "education-employment-7",
    question: "Employment/Education Need",
    inputType: "Text",
  },
];

let FINANCIAL_SECURITY_QA = [
  {
    id: "financial-security-1",
    question:
      "Over the past 3 months, did you ever have difficulties in paying your bills for expenses like housing, utilities, child care, transportation, telephone, medical care, or other basic needs?",
    inputType: "Radio",
    options: ["Never", "One Month", "Two Months", "Every Month"],
  },
  {
    id: "financial-security-2",
    question: "Does your income generally cover your basic household expenses?",
    inputType: "Radio",
    options: ["Yes", "No"],
  },
  {
    id: "financial-security-3",
    question:
      "Over the past 3 months, did you ever cut the size of your meals or skip meals, because there wasn't enough money for food?",
    inputType: "Radio",
    options: [
      "Never",
      "Once or Twice",
      "Several Days",
      "Most Days",
      "Every Day",
    ],
  },

  {
    id: "financial-security-4",
    question: "Which of the following best describes the place you live now?",
    inputType: "GroupSelect",
    group: [
      {
        id: "financial-security-4-1",
        question: "Calworks Benefits (TANF)",
        options: [
          "Own a house or apartment",
          "Rent a house or apartment",
          "Hotel",
          "A Treatment Facility or Group Home",
          "An Emergency Shelter",
          "Couch Surfing",
          "I have no housing",
        ],
      },

      {
        id: "financial-security-4-2",
        question: "Social Security Disability Insurance (SSI)",
        options: [
          "Own axtment",
          "Renc or apartment",
          "Hxsel",
          "A Treasxscy or Group Home",
          "cscAn Emergency Shelter",
          "scscCouch Surfing",
          "I havec no housing",
        ],
      },
      {
        id: "financial-security-4-3",
        question: "General Assistance (GA)",
        options: [
          "Own a house or apartment",
          "Rent a house or apartment",
          "Hotel",
          "A Treatment Facility or Group Home",
          "An Emergency Shelter",
          "Couch Surfing",
          "I have no housing",
        ],
      },

      {
        id: "financial-security-4-4",
        question: "CalFresh Benefits (SNAP)",
        options: [
          "Own axtment",
          "Renc or apartment",
          "Hxsel",
          "A Treasxscy or Group Home",
          "cscAn Emergency Shelter",
          "scscCouch Surfing",
          "I havec no housing",
        ],
      },
      {
        id: "financial-security-4-1",
        question: "Women, Infant & Children Benefits (WIC)",
        options: [
          "Own a house or apartment",
          "Rent a house or apartment",
          "Hotel",
          "A Treatment Facility or Group Home",
          "An Emergency Shelter",
          "Couch Surfing",
          "I have no housing",
        ],
      },

      {
        id: "financial-security-4-2",
        question: "Unemployment Benefits",
        options: [
          "Own axtment",
          "Renc or apartment",
          "Hxsel",
          "A Treasxscy or Group Home",
          "cscAn Emergency Shelter",
          "scscCouch Surfing",
          "I havec no housing",
        ],
      },
      {
        id: "financial-security-4-3",
        question: "State Disability Insurance Benefits (SDI)",
        options: [
          "Own a house or apartment",
          "Rent a house or apartment",
          "Hotel",
          "A Treatment Facility or Group Home",
          "An Emergency Shelter",
          "Couch Surfing",
          "I have no housing",
        ],
      },

      {
        id: "financial-security-4-4",
        question: "Rental Assistance Benefits (e.g. Section 8 housing)",
        options: [
          "Own axtment",
          "Renc or apartment",
          "Hxsel",
          "A Treasxscy or Group Home",
          "cscAn Emergency Shelter",
          "scscCouch Surfing",
          "I havec no housing",
        ],
      },
    ],
  },

  {
    id: "financial-security-5",
    question: "Review notes",
    inputType: "Text",
    options: [],
  },
];

let COMMUNICATIONN_AND_MOBILITY_QA = [
  {
    id: "communication-and-mobility-1",
    question: "Do you have a personal phone where we can easily reach you?",
    inputType: "Radio",
    options: ["Yes", "No"],
  },
  {
    id: "communication-and-mobility-2",
    question:
      "Over the past year, did you ever have difficulty going to work, school, shopping, or an appointment, because the lack of convenient transportation?",
    inputType: "Radio",
    options: [
      "Never",
      "Once or Twice",
      "Several Days",
      "Most Days",
      "Every Day",
    ],
  },
  {
    id: "communication-and-mobility-3",
    question:
      "Is there someone now that you can depend on if you ever needed help to do a task, like getting a ride somewhere, or help with shopping or cooking a meal?",
    inputType: "Radio",
    options: ["Yes", "No", "Don't Know"],
  },
  {
    id: "communication-and-mobility-4",
    question:
      "Which of the following modes of transportation will you typically use to get to Roots?",
    inputType: "Radio",
    options: [
      "Public Transportation",
      "My own car",
      "Ride from friend/family",
      "Walk, but I live within 1 mile",
      "Walk, but I live more than 1 mile away",
    ],
  },
  {
    id: "communication-and-mobility-5",
    question: "Communication/Mobility Need",
    inputType: "Text",
  },
  {
    id: "communication-and-mobility-6",
    question: "Review notes",
    inputType: "Text",
  },
];

let HEALTHCARE_PREVENTIVE_QA = [
  {
    id: "healthcare-preventive-1",
    question: "Do you currently have health insurance?",
    inputType: "Text",
  },
  {
    id: "healthcare-preventive-2",
    question: "What is the plan name?",
    inputType: "Text",
  },
  {
    id: "healthcare-preventive-3",
    question: "Do you have a regular primary care doctor?",
    inputType: "Text",
  },
  {
    id: "healthcare-preventive-4",
    question: "When did you last see your doctor?",
    inputType: "Text",
  },
  {
    id: "healthcare-preventive-5",
    question: "What is the name of the doctor and location?",
    inputType: "Text",
  },
  {
    id: "healthcare-preventive-6",
    question: "Have you had any of the following preventative screening tests?",
    inputType: "Text",
  },
  {
    id: "healthcare-preventive-7",
    question:
      "If selected any of the above screenings, please list the last year of screening?",
    inputType: "Text",
  },
  {
    id: "healthcare-preventive-8",
    question: "Do you have a regular dentist?",
    inputType: "Text",
  },
  {
    id: "healthcare-preventive-9",
    question: "When did you last see your dentist?",
    inputType: "Text",
  },
  {
    id: "healthcare-preventive-10",
    question:
      "Do you have a case manager or social worker who helps you manage your healthcare?",
    inputType: "Text",
  },
  {
    id: "healthcare-preventive-11",
    question: "If yes, what is their name and location?",
    inputType: "Text",
  },
  {
    id: "healthcare-preventive-12",
    question: "Preventative Care Need",
    inputType: "Text",
  },
  {
    id: "healthcare-preventive-13",
    question: "Review notes",
    inputType: "Text",
  },
];

let HEALTHCARE_GENERAL_HEALTH_QA = [
  {
    id: "healthcare-general-health-2",
    question: "In general, would you say your health is",
    inputType: "Text",
  },
  {
    id: "healthcare-general-health-3",
    question:
      "During the past month, how often did poor physical health keep you from doing your usual activities, work, or recreation?",
    inputType: "Text",
  },
  {
    id: "healthcare-general-health-4",
    question:
      "Over the past year, how many times did you go to the emergency room (regular or psych emergency)?",
    inputType: "Text",
  },
  {
    id: "healthcare-general-health-5",
    question: "Health Care - General Health Risk",
    inputType: "Text",
  },
  {
    id: "healthcare-general-health-6",
    question: "Review Notes",
    inputType: "Text",
  },
];

let HEALTHCARE_CARDIOVASCULAR_RISK_QA = [
  {
    id: "healthcare-cardiovascular-risk-1",
    question:
      "Have you ever been diagnosed with any of the following medical conditions? (check all that apply)?",
    inputType: "Text",
  },
  {
    id: "healthcare-cardiovascular-risk-2",
    question:
      "On average, how many days per week do you engage in moderate to strenuous exercise (like walking fast, running, jogging, dancing, swimming, biking, or other activities that cause a light or heavy sweat)?",
    inputType: "Text",
  },
  {
    id: "healthcare-cardiovascular-risk-3",
    question:
      "On average, how many minutes per day do you engage in moderate to strenuous exercise (like walking fast, running, jogging, dancing, swimming, biking, or other activities that cause a light or heavy sweat)?",
    inputType: "Text",
  },
  {
    id: "healthcare-cardiovascular-risk-4",
    question: "Do you smoke cigarettes?",
    inputType: "Text",
  },
  {
    id: "healthcare-cardiovascular-risk-5",
    question: "If yes, how many cigarettes do you smoke per day?",
    inputType: "Text",
  },
  {
    id: "healthcare-cardiovascular-risk-6",
    question:
      "Do you use any tobacco or nicotine products besides cigarettes, such as chewing tobacco, snuff, cigars, or e-cigarettes?",
    inputType: "Text",
  },
  {
    id: "healthcare-cardiovascular-risk-7",
    question: "When was the last time you smoked?",
    inputType: "Text",
  },
  {
    id: "healthcare-cardiovascular-risk-8",
    question: "How frequently do you smoke?",
    inputType: "Text",
  },
  {
    id: "healthcare-cardiovascular-risk-9",
    question: "Review Notes",
    inputType: "Text",
  },
];
