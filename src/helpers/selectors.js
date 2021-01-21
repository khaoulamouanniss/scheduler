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
  }
};
*/
  export function getAppointmentsForDay(state, day) {
  /*
  state.days.name === name return state.days.appointments array or empty array if there is no appointment for that day
  state.days.appointments[i].id === state.appointments.id
  return array of appointments objects (state.appointments)*/
  if (state.days.length !== 0) {
   
    const filteredDay = state.days.filter(dayI => dayI.name === day);

    if(filteredDay.length !== 0){

      let filteredApointments = []
      for (let appointment of filteredDay[0].appointments){
        for (let a in state.appointments){
          if (appointment === state.appointments[a].id) {
            filteredApointments.push(state.appointments[a]);
          }
        }
      }
      return filteredApointments;
    }
  }
  return [];
}