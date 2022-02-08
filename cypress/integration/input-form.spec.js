const hostUrl = "http://localhost:3030";
describe("Input form", () => {
    it("Navitage to the / route", () => {
        cy.visit(hostUrl);
    });

    it("Input has classname", () => {
        cy.focused()
        .should("have.class","new-todo");
    });

    it.only("Only execute this test", () => {
        cy.visit(hostUrl);
        cy.get(".new-todo")
          .type("Buy some milk") //typing on input field
          .should("have.value", "Buy some milk");
    });

});