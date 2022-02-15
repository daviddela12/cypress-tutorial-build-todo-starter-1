describe("Footer", () => {
    context("with a single todo", () => {
        it.only("display a singular todo in count",() => {
            cy.seedAndVisit([{id: 1, name: "Buy chocolate", isComplete: false}]);
            cy.get('.todo-count')
              .should("contain", 1)
        });
    });
});