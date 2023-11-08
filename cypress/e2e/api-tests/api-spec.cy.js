/// <reference types="Cypress" />

describe('TESTING REST API', function(){
    //checking status code as 200 for successful hit
    it('API test for status Validation', function() {    
        cy.request('https://pokeapi.co/api/v2/pokemon/25/').as('pokemon')
        cy.get('@pokemon').its('status')
            .should('equal', 200)
    })

     //checking header to include application/json and charset=utf-8
     it('API test for Header Validation', function() {    
        cy.request('https://pokeapi.co/api/v2/pokemon/25/').as('pokemon')  //id = 25
        cy.get('@pokemon').its('headers').its('content-type')
            .should('include', 'application/json; charset=utf-8')
    })

    //checking if endpoint gives 404 not found error incase of invalid id 
    //as there are less than 1300 pokemon so 10000 is invalid id
    it('API test for 404 status Validation', function() {     
        cy.request({
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/10000/',
            failOnStatusCode: false,
        }).as('pokemon')
        cy.get('@pokemon').its('status')
            .should('equal', 404)
    })

    //checking the name corresponding to the id sent in the request
    it('API test to validate name corresponding to id', function() {         
        cy.request('https://pokeapi.co/api/v2/pokemon/25/').as('pokemon')    // for id 25 the pokemon is pikachu 
        cy.get('@pokemon').its('body')
            .should('include', {name: 'pikachu'})
    })

    //checking the endpoint for name in place for ID
    it('API test to validate if endpoint is accepting name', function() {    
        cy.request('https://pokeapi.co/api/v2/pokemon/pikachu/').as('pokemon')
        cy.get('@pokemon').its('body')
            .should('include', {name: 'pikachu'})
    })

    //checking if endpoint works for invalid pokemon name
    it('API test to validate endpoint with invalid name', function() {       
        cy.request({
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/pikkka/',
            failOnStatusCode: false,
    }).as('pokemon')
        cy.get('@pokemon').its('status')
            .should('equal', 404)
    })

    //checking if endpoint works for invalid input
    it('API test for bad input', function() {
        cy.request({
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/10,3/',
            failOnStatusCode: false,
        }).as('pokemon')
        cy.get('@pokemon').its('status')
            .should('equal', 404)
    })

    //checking if endpoint works for decimal id which is invalid
    it('API test to validate endpoint with invalid id', function() {
        cy.request({
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/2.2/',
            failOnStatusCode: false,
    }).as('pokemon')
        cy.get('@pokemon').its('status')
            .should('equal', 404)
    })

    //other tests can be related to request timeout, validating response for other data than pokemon name etc.
})
