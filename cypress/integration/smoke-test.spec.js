/**Integration tests - without mock the Requests */
describe("The application loads", () => {
  context("Todo list without elements", () => {
    beforeEach(() => {
      cy.request('GET', '/api/todos')  //Al ser test de integracion, no se hace un cy.route mockeando la llamada. Sino que se hace directamente la request
        .its('body')
        .each(todo => cy.request('DELETE', `/api/todos/${todo.id}`))
    })
    it("Add new item", () => {
      cy.visit('/')
      cy.server()
      cy.route('POST', '/api/todos')
        .as('create')

      cy.get('.new-todo')
        .type('Buy milk{enter}')
      
      cy.wait('@create')

      cy.get('.todo-list li')
        .should('have.length', 1)
    })
  })
});
