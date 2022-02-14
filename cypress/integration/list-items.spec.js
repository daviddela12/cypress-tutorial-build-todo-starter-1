describe("Todo Items behavoir", () => {
     /**
     * Cargamos los fixture:todos de ejemplo. Uno de ellos tiene isComplete a true
     **/
    beforeEach(() => {
        cy.seedAndVisit('fixture:todos');
    });
    /**
     * Comprobamos que en el listado que muestra de todos hay 1 que tiene la clase completed
     * El que tiene la clase completed debe contener "Eggs" (porque es a ese en el fixture:todos al que le hemos puesto isCompleted=true)
     * Despues buscamos la clase .toggle que es el input checkbox
     * Comprobamos que está chequeado el input. Significa que está completada
     */
    it("Properly display completed items", () => {
        cy.get('.todo-list li')
          .filter('.completed')
          .should('have.length', 1)
          .and('contain', 'Eggs')
          .find('.toggle')
          .should('be.checked');
    });

    it("Show correct todos left on footer", () => {
        cy.get('.todo-count')
          .should('contain', 3);
    });

    it("Removes a todo", () => {
        cy.route({
            method: 'DELETE',
            url: '/api/todos/1',
            status: 200,
            response: {}
        })
        cy.get('.todo-list li')
          .as('todoList'); //con el alias conseguimos crear un shortname para identificarlo más rápido.
        
        cy.get('@todoList')
          .first()
          .find('.destroy')
          .invoke('show')
          .click();

        cy.get('@todoList')
          .should('have.length', 3)
          .and('not.contain', 'Milk');
          
    });
});