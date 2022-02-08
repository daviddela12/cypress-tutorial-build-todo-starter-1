describe("Input form", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Input has classname", () => {
        cy.get(".new-todo")
        .should("have.class","new-todo");
    });

    it("Only execute this test", () => {
        cy.get(".new-todo")
          .type("Buy some milk") //typing on input field
          .should("have.value", "Buy some milk");
    });

});