/// <reference types="cypress" />

describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset/');
    const user = {
      username: 'admin',
      password: 'pass',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://127.0.0.1:5173');
  });

  it('front page can be opened', function () {
    cy.contains('My library');
  });
  it('log in with existing user', function () {
    cy.get('#loginUsernameInput').type('admin');
    cy.get('#loginPasswordInput').type('pass');
    cy.contains('Log In').click();
    cy.contains('admin logged in');
  });

  it('fails login with wrong credentials', () => {
    cy.get('#loginUsernameInput').type('nullUser');
    cy.get('#loginPasswordInput').type('pass');
    cy.contains('Log In').click();
    cy.contains('Invalid username or password');
  });

  it('creates a user', () => {
    cy.contains('Create user').click();
    cy.get('#createUsernameInput').type('testCypress');
    cy.get('#createPasswordInput').type('pass123');
    cy.get('[role="dialog"]').within(() => {
      cy.contains('Create').click();
    });
    cy.contains('user testCypress created');
  });

  describe('with logged user', function () {
    beforeEach(function () {
      cy.get('#loginUsernameInput').type('admin');
      cy.get('#loginPasswordInput').type('pass');
      cy.contains('Log In').click();
    });
    it('show username in the title and notification', function () {
      cy.contains(`admin's library`);
      cy.contains(`admin logged in`);
    });
    it('user can create a book entry', function () {
      cy.contains('Add book').click();
      cy.get('#titleInput').type('test with cypress');
      cy.get('#authorInput').type('Coder');
      cy.get('#yearInput').type('2022');
      cy.get('#isReadInput').click({ force: true });
      cy.contains('Create').click();
    });
    describe('with a book created', function () {
      beforeEach(function () {
        cy.contains('Add book').click();
        cy.get('#titleInput').type('test with cypress');
        cy.get('#authorInput').type('Coder');
        cy.get('#yearInput').type('2022');
        cy.get('#isReadInput').click({ force: true });
        cy.contains('Create').click();
      });
      it('create another book', function () {
        cy.contains('Add book').click();
        cy.get('#titleInput').type('test multiple books');
        cy.get('#authorInput').type('Coder1');
        cy.get('#yearInput').type('2020');
        cy.get('#isReadInput').click({ force: true });
        cy.contains('Create').click();
        cy.contains('test multiple books');
        cy.contains('test with cypress');
      });
      it('toggle read/unread', function () {
        cy.get('.bookcard').find('.chakra-badge').should('have.text', 'Read');
        cy.get('.bookcard')
          .first()
          .contains(`Mark as 'unread/read'`)
          .click({ force: true });
        cy.get('.bookcard').find('.chakra-badge').should('have.text', 'Unread');
      });
    });
  });
});
