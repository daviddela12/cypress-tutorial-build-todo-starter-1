describe("Footer", () => {
    context("with a single todo", () => {
        it("display a singular todo in count",() => {
            cy.seedAndVisit([{id: 1, name: "Buy chocolate", isComplete: false}]);
            cy.get('.todo-count')
              .should("contain", "1 todo left")
        });

        it("display two singular todos in count", () => {
            cy.seedAndVisit([
                {id: 1, name: "Buy chocolate", isComplete: false},
                {id: 2, name: "Buy bread", isComplete: false}
            ]);
            cy.get('.todo-count')
              .should('contain', '2 todos left');
        });
    });
});