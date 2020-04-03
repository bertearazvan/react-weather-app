/// <reference types="cypress" />

describe("Testing the side navigation naviagtion", () => {
    describe("visits the cityList page from Weather page", () => {
        beforeEach(() => {
            cy.visit('http://localhost:3000/react-weather-app/build/')
        })

        it("loads the button", () => {
            cy.get("[data-cy=sidebarIcon]")
                .should("be.visible")
        })

        it("opens the drawer when clicking on button", () => {
            cy.get("[data-cy=sidebarIcon]")
                .click()

            cy.get("[data-cy=sidebarDrawer]")
                .should("be.visible")

            cy.get("[data-cy=sidebarTitle]").should("be.visible");
            cy.get("[data-cy=sidebarList] a").should('have.length.greaterThan', 0)
        })

        it("visits the cityList page when clicking on CityList", () => {
            cy.get("[data-cy=sidebarIcon]")
                .click()
            cy.get("[data-cy=sidebarList] a").contains("City List").click();
            cy.url().should('eq', 'http://localhost:3000/react-weather-app/build/city-list')
        })

    })

    describe("visits the weather page from citylist page", () => {
        beforeEach(() => {
            cy.visit('http://localhost:3000/react-weather-app/build/city-list')
        })

        it("loads the button", () => {
            cy.get("[data-cy=sidebarIcon]")
                .should("be.visible")
        })

        it("opens the drawer when clicking on button", () => {
            cy.get("[data-cy=sidebarIcon]")
                .click()

            cy.get("[data-cy=sidebarDrawer]")
                .should("be.visible")

            cy.get("[data-cy=sidebarTitle]").should("be.visible");
            cy.get("[data-cy=sidebarList] a").should('have.length.greaterThan', 0)
        })

        it("visits the cityList page when clicking on Weather", () => {
            cy.get("[data-cy=sidebarIcon]")
                .click()
            cy.get("[data-cy=sidebarList] a").contains("Weather").click();
            cy.url().should('eq', 'http://localhost:3000/react-weather-app/build')
        })

    })
})