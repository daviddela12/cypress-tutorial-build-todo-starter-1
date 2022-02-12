describe('App initialization', () => {
    it('Loads todos on page load', () => {
        cy.seedAndVisit('fixture:todos');

        cy.get('.todo-list li')
          .should('have.length', 4);

    });

    it("Display error message on failure", () => {
        /** Aqui le dices:
         * Server: Prepara la aplicacion
         * Route: Cuando la aplicacion llame aqui mockealo por esta respuesta. En este caso, cuando haga un GET a /api/todos que se devuelva status 500 y respuesta vacia
         * Visit: Carga el sitio
         */
        cy.server();
        cy.route({
            method: 'GET', 
            url: '/api/todos', 
            status: 500,
            response: {}
        });
        cy.visit("/");
        
        cy.get('.todo-list li')
          .should('not.exist');

        cy.get('.error')
          .should('be.visible');
    });
});