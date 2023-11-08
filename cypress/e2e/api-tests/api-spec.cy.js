/// <reference types="Cypress" />

describe('TESTING REST API', function(){
    it('API test for Header Validation', function() {
        cy.request('https://pokeapi.co/api/v2/pokemon/25/').as('pokemon')
        cy.get('@pokemon').its('headers').its('content-type')
            .should('include', 'application/json; charset=utf-8')
    })

    it('API test for status Validation', function() {
        cy.request('https://pokeapi.co/api/v2/pokemon/25/').as('pokemon')
        cy.get('@pokemon').its('status')
            .should('equal', 200)
    })

    it('API test to validate name', function() {
        cy.request('https://pokeapi.co/api/v2/pokemon/25/').as('pokemon')
        cy.get('@pokemon').its('body')
            .should('include', {name: 'pikachu'})
    })

    it('API test to validate if endpoint is accepting name', function() {
        cy.request('https://pokeapi.co/api/v2/pokemon/pikachu/').as('pokemon')
        cy.get('@pokemon').its('body')
            .should('include', {name: 'pikachu'})
    })

    it('API test for 404 status Validation', function() {
        cy.request({
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/10000/',
            failOnStatusCode: false,
        }).as('pokemon')
        cy.get('@pokemon').its('status')
            .should('equal', 404)
    })

    it('API test for bad input', function() {
        cy.request({
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/10,3/',
            failOnStatusCode: false,
        }).as('pokemon')
        cy.get('@pokemon').its('status')
            .should('equal', 404)
    })
})