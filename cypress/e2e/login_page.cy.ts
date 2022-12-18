describe('The Login Page', () => {
  beforeEach(() => {
    cy.viewport(380, 844);
  });

  it('user can sign in, navigate to settings and sign out', () => {
    cy.visit('/');

    cy.get('button').contains('LOG IN').click();
    cy.get('input[name=email]').type(Cypress.env('USERMAIL'));
    cy.get('input[name=password]').type(Cypress.env('PASSWORD'));
    cy.get('input[type=submit]').click();

    cy.get('a[href*=settings]').click();
    cy.get('button[name=sign-out]').click();
  });
});
