describe("Todo Items behavoir", () => {
    /**
     * Cargamos los fixture:todos de ejemplo. Uno de ellos tiene isComplete a true
     * Comprobamos que en el listado que muestra de todos hay 1 que tiene la clase completed
     * El que tiene la clase completed debe contener "Eggs" (porque es a ese en el fixture:todos al que le hemos puesto isCompleted=true)
     * Despues buscamos la clase .toggle que es el input checkbox
     * Comprobamos que está chequeado el input. Significa que está completada
     */
    it.only("Properly display completed items", () => {
        cy.seedAndVisit('fixture:todos');
        cy.get('.todo-list li')
          .filter('.completed')
          .should('have.length', 1)
          .and('contain', 'Eggs')
          .find('.toggle')
          .should('be.checked');
    });
});