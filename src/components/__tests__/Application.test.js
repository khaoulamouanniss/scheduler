import React from "react";
import { render, cleanup, waitForElement, fireEvent, prettyDOM, getAllByTestId, getByText, getByAltText, getByPlaceholderText, queryByText, queryByAltText, waitForElementToBeRemoved} from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);
describe("Application", () => {

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.
  expect(
    getByText(appointment, "Are you sure you would like to delete?")
  ).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(getByAltText(appointment, "Edit"));

  expect(
    getByPlaceholderText(appointment, /Enter Student Name/i)
  ).toBeInTheDocument();
  fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
    target: { value: "khaoula" }
  });

 
  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElementToBeRemoved(() => getByText(appointment, /Saving/i));


  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
});

it("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, /Add/i));

    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), { target: { value: "Lydia Miller-Jones" } });

    fireEvent.click(getByAltText(appointment, /Sylvia Palmer/i));

    fireEvent.click(getByText(appointment, /save/i));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, /Could not save appointment./i)
    );


    fireEvent.click(getByAltText(appointment, /close/i));
    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day");
  const selectedDay = day.find((item) => queryByText(item, "Monday"));
  expect(getByText(selectedDay, /1 spot remaining/i)).toBeInTheDocument();

});

it("shows the delete error when failing to delete an appointment", async () => {
  axios.delete.mockRejectedValueOnce();

  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment").find((item) =>
  queryByText(item, "Archie Cohen"));
  fireEvent.click(getByAltText(appointment, /delete/i));


  expect(
    getByText(appointment, /Are you sure you would like to delete?/i)
  ).toBeInTheDocument();


  fireEvent.click(getByText(appointment, /confirm/i));

  expect(getByText(appointment, /deleting/i)).toBeInTheDocument();


  await waitForElementToBeRemoved(() =>
    queryByText(appointment, /deleting/i)
  );
  expect(
    getByText(appointment, /Could not delete appointment/i)
  ).toBeInTheDocument();

  fireEvent.click(getByAltText(appointment, /close/i));


  expect(getByText(appointment, /Archie Cohen/i)).toBeInTheDocument();

  const day = getAllByTestId(container, "day");
  const selectedDay = day.find((item) => queryByText(item, "Monday"));
  expect(getByText(selectedDay, /1 spot remaining/i)).toBeInTheDocument();
});

})