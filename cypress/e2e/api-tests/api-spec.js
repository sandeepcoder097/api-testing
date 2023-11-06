/// <reference types="Cypress" />

describe('TESTING REST API', function(){
    it('API test Header Validation', function() {
        cy.request('https://pokeapi.co/api/v2/pokemon/25/').as('pokemon')
        cy.get('@pokemon').its('headers').its('content-type')
            .should('include', 'application/json; charset= utf-8')
    })
})