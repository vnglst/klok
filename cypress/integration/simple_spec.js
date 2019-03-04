describe('Basic tests', function() {
  it('Hours hand should exist', function() {
    cy.visit('http://localhost:3000/')

    cy.get('[data-test-id="hours-hand"]').should('exist')
  })
})
