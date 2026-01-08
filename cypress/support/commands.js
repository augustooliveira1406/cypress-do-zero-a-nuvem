Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'John',
    lastName: 'Sample',
    email: 'johnsamole@gmail.com',
    text: 'Texto fixo!!!'
}) => {

    cy.get('[name="firstName"]').type(data.firstName)
    cy.get('[name="lastName"]').type(data.lastName)
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type(data.email)
    cy.get('[name="open-text-area"]').type(data.text)
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
})