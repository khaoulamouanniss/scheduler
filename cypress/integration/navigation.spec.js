describe("Navigation", () => {

  // First test
  it("should visit root", () => {

    cy.visit("/");
  });

  //Second test
  it("should navigate to Tuesday", () => {

    cy.visit("/");
    
    cy.contains("li", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});