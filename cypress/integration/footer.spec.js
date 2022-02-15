describe("Footer", () => {
    context("with a single todo", () => {
        it("display a singular todo in count",() => {
            cy.seedAndVisit([{id: 1, name: "Buy chocolate", isComplete: false}]);
            cy.get('.todo-count')
              .should("contain", "1 todo left")
        });
    });

    context("with multiples todos", () => {
        beforeEach(() => {
            cy.seedAndVisit('fixture:todos');
        });
        it("display two singular todos in count", () => {
            cy.get('.todo-count')
              .should('contain', '3 todos left');
        });

        it("show Active todos", () => {
            cy.contains('Active')
              .click();
            
            cy.get('.todo-list li')
              .should('have.length', 3)
        });
    });
});