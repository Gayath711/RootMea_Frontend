import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CarePlanForm = () => {
  const [carePlan, setCarePlan] = useState(null);

  useEffect(() => {
    // Fetch care plan data from API
    const fetchCarePlan = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/client-care-plans/1/');
        setCarePlan(response.data);
      } catch (error) {
        console.error('Error fetching care plan:', error);
      }
    };

    fetchCarePlan();
  }, []);

  return (
    <div>
      {carePlan && (
        <div>
          <h2>Care Plan</h2>
          <p>User Name: {carePlan.user_name}</p>
          <p>Facility: {carePlan.facility}</p>
          <p>Program: {carePlan.program}</p>
          <p>Client Name: {carePlan.client_information.first_name} {carePlan.client_information.last_name}</p>
          <p>Date of Birth: {carePlan.client_information.date_of_birth}</p>
          <p>Preferred Pronouns: {carePlan.client_information.preferred_pronouns}</p>
          <p>Primary Phone: {carePlan.client_information.primary_phone}</p>
          <p>Email Address: {carePlan.client_information.email_address}</p>
          
          <br></br>
          <br></br>
          <h3>Client Goals:</h3>
          {carePlan.client_goals.map((goal) => (
            <div key={goal.id}>
              <p>Goal: {goal.smart_goal_summary}</p>
              <p>Start Date: {goal.start_date}</p>
              <p>Problem: {goal.problem}</p>
              <p>Status: {goal.goal_status}</p>
              <p>Priority: {goal.goal_priority}</p>
              <p>Readiness: {goal.stage_of_readiness}</p>
              <p>Strengths: {goal.client_strengths}</p>
              <p>Barriers: {goal.potential_barriers}</p>
              <p>Comments: {goal.comments}</p>
              <p>Goal Date: {goal.goal_date}</p>
              
              <br></br>
              <h4>Interventions:</h4>
              {goal.interventions.map((intervention) => (
                <div key={intervention.id}>
                  <p>Intervention: {intervention.intervention}</p>
                  <p>Due Date: {intervention.due_date}</p>
                  <p>Completed Date: {intervention.completed_date}</p>
                  <p>Notes: {intervention.notes}</p>
                </div>
              ))}
            </div>
          ))}
         <br></br>
         <br></br>
          <h3>Client History:</h3>
          {carePlan.client_history.map((history) => (
            <div key={history.id}>
              <p>User: {history.user}</p>
              <p>Action: {history.action}</p>
              <p>Date: {history.date}</p>
              <p>Time: {history.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarePlanForm;
