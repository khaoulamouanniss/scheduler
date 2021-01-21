/*const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};*/

//appointments = dayfound.appointments.map(appointmentId => state.appointments[apointmentId]
 export function getAppointmentsForDay(state, day) {

  if (state.days.length !== 0) {
   
    const filteredDay = state.days.filter(dayI => dayI.name === day);

    if(filteredDay.length !== 0){

      const filteredApointments = Object.values(state.appointments).filter(appointment => filteredDay[0].appointments.indexOf(appointment.id) > -1);

      return filteredApointments;
    }
  }
  return [];
};


 export function getInterview(state, interview) {

  if(interview){  
    const interviewer = Object.values(state.interviewers).filter(interviewer => interviewer.id === interview.interviewer);
    return{student :interview.student, interviewer:interviewer[0]};
  }    
  return null;
};

//interviewerlist = object.values(interviewers)