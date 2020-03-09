describe('Loading app', function() {

  it('Did it load?', function() {
    cy.visit('http://localhost:4200');
    cy.contains("AdThrive");
  }),

  it('Check for initial API error', ()=> {
    cy.get('.errorContainer').should('not.contain', 'error')
  })
  
  it('Click Next page button', () => {
    // https://on.cypress.io/click
    cy.get('.top .nextBtn').click({ multiple: true, delay:2000 })
  })
  
  it('Did the next page load?', function() {
  //  cy.visit('http://localhost:4200');
    cy.get('.top .currentPageBtn').should('have.value', '2')
  }),

  it('Click previous page button', () => {
    // https://on.cypress.io/click
    cy.get('.top .prevBtn').click({ multiple: true, delay:2000  })
  }),

  it('Did the previous page load?', function() {
    //  cy.visit('http://localhost:4200');
    cy.get('.top .currentPageBtn').should('have.value', '1')
  })

})