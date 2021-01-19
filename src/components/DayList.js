import React from "react";
//import classnames from "classnames";
import DayListItem from "./DayListItem";
//import "components/DayList.scss";

export default function DayList(props) {
  const DayListData = props.days.map(day => <DayListItem 
    key={day.id} 
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={props.setDay}  />)
  return (
    <ul>
      {DayListData}
    </ul>
  );
}


