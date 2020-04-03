/// <reference types="cypress" />

describe("CityList component", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/react-weather-app/build/city-list')
    })
    describe("loads and tests the Searchbar", () => {
        it("loads SearchBar on load", () => {
            cy.get("[data-cy=searchBar]")
                .should("be.visible")
                .focus()
                .type("Suceava")
        })

        it("loads the search button on load", () => {
            cy.get("[data-cy=searchBtn]")
                .should("be.visible")
        })

        it("loads the first city", () => {
            cy.get("tbody tr").contains("3040051")
        })

        it("writes a name of a city and presses on submit", () => {
            cy.get("[data-cy=searchBar]")
                .focus()
                .type("Suceava")

            cy.get("[data-cy=searchBtn]").click()

            cy.wait(500).get("tbody tr").should('have.length', 6)
        })

    })


    describe("loads and tests the table", () => {
        it("loads the table", () => {
            cy.get("[data-cy=tableCities]")
                .should("be.visible")
        })

        it("loads the pagination", () => {
            cy.get("[data-cy=paginationTableCities]")
                .should("be.visible")
        })

        it("loads 10 rows in the table on load", () => {
            cy.get("tbody tr").should('have.length', 10)
            cy.get(".MuiTablePagination-caption").should("contain", "1-10 of 23018")
        })

        it("can change the number of rows", () => {
            cy.get(".MuiSelect-select")
                .click()

            cy.get(".MuiList-root li")
                .should('have.length', 3)

            cy.get(".MuiList-root li")
                .contains('25')
                .click()

            cy.wait(500).get("tbody tr").should('have.length', 25)
            cy.get(".MuiTablePagination-caption").should("contain", "1-25 of 23018")

            cy.get(".MuiSelect-select")
                .click()

            cy.get(".MuiList-root li")
                .should('have.length', 3)
                .contains('100')
                .click()

            cy.wait(500).get("tbody tr").should('have.length', 100)
            cy.get(".MuiTablePagination-caption").should("contain", "1-100 of 23018")
        })

        it("can press next/previous buttons", () => {
            cy.get(".MuiTablePagination-actions button").eq(1).click()
            cy.get("tbody tr").contains("3040051").should('not.exist')
            cy.get("tbody tr").contains("292878").should('exist')
            cy.get(".MuiTablePagination-caption").should("contain", "11-20 of 23018")

            cy.get(".MuiTablePagination-actions button").eq(0).click()
            cy.get("tbody tr").contains("3040051").should('exist')
            cy.get("tbody tr").contains("292878").should('not.exist')
            cy.get(".MuiTablePagination-caption").should("contain", "1-10 of 23018")
        })
    })


})