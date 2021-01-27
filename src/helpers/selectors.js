

export function getAppointmentsForDay(state, day) {

  const filteredDay = state.days.find(dayState => day === dayState.name);

  if (filteredDay) {

    const appointments = filteredDay.appointments.map(appointmentId => state.appointments[appointmentId]);
    return appointments;
  }

  return [];
  };
  
export function getInterviewersForDay(state, day) {

  const filteredDay = state.days.find(dayState => day === dayState.name);

  if (filteredDay) {

    const interviewers = filteredDay.interviewers.map(interviewerId => state.interviewers[interviewerId]);
    return interviewers;
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
