const todos = [
    {
      "id": 1,
      "name": "Buy Milk",
      "isComplete": false
    },
    {
      "id": 2,
      "name": "Buy Eggs",
      "isComplete": false
    },
    {
      "id": 3,
      "name": "Buy Bread",
      "isComplete": false
    },
    {
      "id": 4,
      "name": "Make French Toast",
      "isComplete": false
    }
];  
describe('App initialization', () => {
    it.only('Loads todos on page load', () => {
      cy.server();
      cy.route('GET', '/api/todos', todos); // the last argument "todos" is the response for the GET call
      cy.visit('/');

      cy.get('.todo-list li')
          .should('have.length', 4);

    });
});