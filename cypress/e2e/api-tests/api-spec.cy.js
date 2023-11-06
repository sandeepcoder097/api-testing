/// <reference types="Cypress" />

describe('TESTING REST API', function(){
    it('API test Header Validation', function() {
        cy.request('https://pokeapi.co/api/v2/pokemon/25/').as('pokemon')
        cy.get('@pokemon').its('headers').its('content-type')
            .should('include', 'application/json; charset=utf-8')
    })

    it('API test status Validation', function() {
        cy.request('https://pokeapi.co/api/v2/pokemon/25/').as('pokemon')
        cy.get('@pokemon').its('status')
            .should('equal', 200)
    })

    it('API test validate name', function() {
        cy.request('https://pokeapi.co/api/v2/pokemon/25/').as('pokemon')
        cy.get('@pokemon').its('body')
            .should('include', {name: 'pikachu'})
    })

    it('API test 404 status Validation', function() {
        cy.request({
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/10000/',
            failOnStatusCode: false,
        }).as('pokemon')
        cy.get('@pokemon').its('status')
            .should('equal', 404)
    })
})

