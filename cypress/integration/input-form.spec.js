describe('Input form', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    /** Testing Inputs */
    it('Input has classname', () => {
        cy.get('.new-todo')
        .should('have.class','new-todo');
    });

    it('Only execute this test', () => {
        cy.get('.new-todo')
          .type('Buy some milk') //typing on input field
          .should('have.value', 'Buy some milk');
    });
    /** END Testing Inputs */

    context('Form submittions', () => {
        it.only('Add new todo task', () => {
            cy.server();
            cy.route('POST', '/api/todos', {
                name: 'Buy some eggs',
                id: 1,
                isComplete: false
            });
            cy.get('.new-todo')
            .type('Buy some eggs')
            .type('{enter}');

            cy.get('.todo-list li')
              .should('have.length', 1)
              .and('contain', 'Buy some eggs');
        });
    });
});