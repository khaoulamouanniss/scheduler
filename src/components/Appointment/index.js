import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment (props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE='CREATE';
  const SAVING = 'SAVING';
  const CONFIRM = 'CONFIRM';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

 function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id,interview)
    .then(() => transition(SHOW))
  }; 

  function deleteApp() {
    props.cancelInterview(props.id,null)
    transition(EMPTY);
  };

  return (
    
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete = {deleteApp}
        />
      )}
      {mode === CREATE && (
        <Form
        interviewers = {props.interviewers}
        onSave={save} 
        onCancel={() => back(EMPTY)} 
        setInterviewer={props.setInterviewer}
      />
      )}
       {mode === SAVING && (
        <Status message="Saving" />
      )}
     
      
    </article>
  )
}

//{props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> :  <Empty />}