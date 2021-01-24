
import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

const updateDays = (id, add) => {
    const days = state.days.map(day => {
      const newDay  = {...day};
      console.log('I am spots before', newDay.spots)
      if (newDay.appointments.includes(id)) {
        add ? newDay.spots++ : newDay.spots--;
        console.log('I am spots after', newDay.spots)

      }
      return newDay;
    })
  
  return days;
}

function bookInterview(id, interview) {

  const appointment = {
   
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  
  return axios.put(`/api/appointments/${id}`,{'interview':interview}).then(() => setState({...state,appointments, days:updateDays(id, false)})
  )
}
 function cancelInterview (id) {
  const nullAppointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: nullAppointment
  };
  
  return axios.delete(`/api/appointments/${id}`).then(() => setState({...state,appointments, days:updateDays(id, true)}))

 }

 useEffect(() => {
  Promise.all([
      axios.get('/api/days'), 
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]
  ).then(all => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
  })

}, []);


return {
  state,
  setDay,
  bookInterview,
  cancelInterview
  } 
  
}
