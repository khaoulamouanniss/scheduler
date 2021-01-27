import React, { useState } from "react";

import InterviewerList from "../InterviewerList";

import Button from "../Button";

export default function Form(props){

  const [error, setError] = useState("");

  // Function to reset student's name and interviewer
  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  // Function to cqncel the entries from the props and the form
  const cancel = () => {
    reset();
    props.onCancel();
  };

  // Function to verify that the student name is not empty
  function validate() {
		if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Interviewer is not selected");
      return;
    }
  
    setError("");
    props.onSave(name, interviewer);
	};

  const [name, setName] = useState(props.name || "");

  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()} >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
          <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={(event) => cancel()}>Cancel</Button>
          <Button confirm onClick = {validate}>Save</Button>
        </section>
      </section>
    </main>
  )
};