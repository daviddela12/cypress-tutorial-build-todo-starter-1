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

        it("Handle footer filters todos", () => {
            const filters = [
                {filter: 'Active', expectedLength: 3},
                {filter: 'Completed', expectedLength: 1},
                {filter: 'All', expectedLength: 4},
            ]
            cy.wrap(filters).each( (filter) => {
                cy.contains(filter.filter)
                  .click();
              
                cy.get('.todo-list li')
                  .should('have.length', filter.expectedLength);
            })
        });
    });
});