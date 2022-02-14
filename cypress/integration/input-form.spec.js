describe('Input form', () => {
    beforeEach(() => {
        cy.seedAndVisit();
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
        beforeEach(() => {
            cy.server(); //Start a server to begin routing responses to cy.route()
        });
        it('Add new todo task', () => {
             /** Aqui le dices:
             * Route: Cuando la aplicacion llame aqui mockealo por esta respuesta. En este caso, cuando haga un POST a /api/todos, que la respuesta sea Buy some eggs...y demás info
             */
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

        it('Shows an error message on a failed submission', () => {
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