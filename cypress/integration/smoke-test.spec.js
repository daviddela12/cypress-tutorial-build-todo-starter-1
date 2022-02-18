/**Integration tests - without mock the Requests */
describe("The application loads", () => {
  beforeEach(() => {
    cy.request('GET', '/api/todos')  //Al ser test de integracion, no se hace un cy.route mockeando la llamada. Sino que se hace directamente la request
      .its('body')
      .each(todo => cy.request('DELETE', `/api/todos/${todo.id}`))
  })

  context("Todo list without elements", () => { 
    it("Add new todo items", () => {
      const items = [
        {todo: 'Buy milk', expectedLength: 1},
        {todo: 'Buy eggs', expectedLength: 2},
        {todo: 'Buy chocolate', expectedLength: 3}
      ]
      cy.visit('/')
      cy.server()
      cy.route('POST', '/api/todos')
        .as('create')

      cy.wrap(items)
        .each(item => {
          cy.get('.new-todo')
            .type(item.todo)
            .type('{enter}')
          
          cy.wait('@create')
    
          cy.get('.todo-list li')
            .should('have.length', item.expectedLength)
        })
    })
  })

  context("playing with items", () => {
    /**load todos from fixture */
    beforeEach( () => {
      cy.fixture('todos')
        .each(todo => {
          const newTodo = Cypress._.merge(todo, {isComplete: false})
          cy.request('POST', '/api/todos', newTodo)
        })
        cy.visit('/')
    });

    /**check todos are correctly loaded */
    it("Items are loaded from database", () => {
       cy.get('.todo-list li')
         .should('have.length', 4);
    })

    it('Deletes all todos loaded', () => {
      cy.server()
      cy.route('DELETE', '/api/todos/*')
        .as('delete')

      cy.get('.todo-list li')
        .each(el => {
          cy.wrap(el)
            .find('.destroy')
            .invoke('show')
            .click()

          cy.wait('@delete')
        })
        .should('not.exist')
    })

    it('Toggles todos', () => {
      const clickAndWait = (el) => {
        cy.wrap(el)
          .as('item')
          .find('.toggle')
          .click()
  
        cy.wait('@update')
      }

      cy.server()
      cy.route('PUT', '/api/todos/*')
        .as('update')
  
      cy.get('.todo-list li')
      /** todo checked */
        .each(el => {
          clickAndWait(el)
          cy.get('@item')
            .should('have.class', 'completed')
        }) /** todo unchecked */
        .each($el => {
          clickAndWait($el)
          cy.get('@item')
            .should('not.have.class', 'completed')
        })
      })
  });
});
