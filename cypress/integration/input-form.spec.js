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
        it('Add new todo task', () => {
            cy.server(); //Start a server to begin routing responses to cy.route()
            cy.route('POST', '/api/todos', {
                name: 'Buy some eggs',
                id: 1,
                isComplete: false
            });
            cy.get('.new-todo')
            .type('Buy some eggs')
            .type('{enter}')
            .should('have.value', '');

            cy.get('.todo-list li')
              .should('have.length', 1)
              .and('contain', 'Buy some eggs');
        });

        it.only('Shows an error message on a failed submission', () => {
            cy.server();
            cy.route({
                method: 'POST', 
                url: '/api/todos', 
                status: 500,
                response: {}
            });
            cy.get('.new-todo')
              .type('test{enter}');
            
            cy.get('.todo-list li')
              .should('not.exist');

            cy.get('.error')
              .should('be.visible');

        });
    });
});