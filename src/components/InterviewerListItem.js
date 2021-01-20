import React from "react";
import "./InterviewerListItem.scss";
const classnames = require("classnames");


export default function InterviewerListItem(props) {

  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  const {name, selected} = props;
  return (
    <li className={interviewerClass} onClick = {props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src= {props.avatar}
        alt= {name}
      />
      {//{props.selected && props.name}
      }
      {selected ? name : ""}
    </li>
  );
}


