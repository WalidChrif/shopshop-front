// commands.js (or you can put it directly in the spec file for simplicity)
Cypress.Commands.add('visitCheckoutPage', () => {
  cy.visit('http://localhost:4200');
  cy.contains('Crash Course in Python').click();
  cy.contains('Add to cart').click();
  cy.contains('Proceed To Checkout').click();
  cy.get('#code').type('1');
  cy.should('have.value', '1');
  cy.contains('Checkout').click();
});

Cypress.Commands.add('fillCheckoutForm', (user) => {


  // Fill in user details
  cy.get('input[formControlName="firstName"]').type(user.firstName);
  cy.get('input[formControlName="lastName"]').type(user.lastName);
  cy.get('input[formControlName="email"]').type(user.email);

  // Fill in shipping address
  cy.get('[formGroupName="shippingAddress"]').within(() => {
    cy.get('[formControlName="country"]').select(user.country);
    cy.get('input[formControlName="street"]').type(user.street);
    cy.get('input[formControlName="city"]').type(user.city);
    cy.get('select[formControlName="state"]').select(user.state);
    cy.get('input[formControlName="zipcode"]').type(user.zipcode);
  });

  // same address
  cy.get('input[type="checkbox"]').check();
});

Cypress.Commands.add('fillCreditCardInfo', (card) => {
  cy.get('[formGroupName="creditCard"]').within(() => {
    cy.get('select[formControlName="creditCardType"]').select(card.type);
    cy.get('input[formControlName="creditCardName"]').type(card.name);
    cy.get('input[formControlName="creditCardNumber"]').type(card.number);
    cy.get('input[formControlName="creditCardCCV"]').type(card.ccv);
    cy.get('select[formControlName="creditCardExpMonth"]').select(card.expMonth);
    cy.get('select[formControlName="creditCardExpYear"]').select(card.expYear);
  });
});

Cypress.Commands.add('submitCheckoutForm', () => {
  cy.get('form').should('not.have.class', 'ng-invalid');
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/order-receipt');
});

Cypress.Commands.add('validateFormErrors', () => {
  // Assert error messages for customer group
  cy.get('[formGroupName="customer"]').within(() => {
    cy.contains('Please enter a valid first name').should('be.visible');
    cy.contains('Please enter a valid email').should('be.visible');
  });

  // Assert error messages for shipping address group
  cy.get('[formGroupName="shippingAddress"]').within(() => {
    cy.contains('Please select a valid state').should('be.visible');
  });

  // Assert error messages for credit card group
  cy.get('[formGroupName="creditCard"]').within(() => {
    cy.contains('Please enter a valid credit card number').should('be.visible');
  });
});
Cypress.Commands.add('formInvalidationPopover', () => {
  cy.get('button.submit-btn').click();
  cy.get('window').should('be.visible');
  cy.get('ngb-popover-window').should('be.visible');
});

// spec file
describe('template spec', () => {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    country: 'United States',
    street: '1234 Main St',
    city: 'New York',
    state: 'New York',
    zipcode: '10001'
  };

  const creditCard = {
    type: 'Visa',
    name: 'John Doe',
    number: '4111111111111111',
    ccv: '123',
    expMonth: 'December',
    expYear: '2026'
  };

  it('should complete checkout process', () => {
    cy.visitCheckoutPage();
    cy.fillCheckoutForm(user);
    cy.fillCreditCardInfo(creditCard);
    cy.submitCheckoutForm();
    
  });

  it('should show validation messages when required fields are missing', () => {
    cy.visitCheckoutPage();
    cy.get('button.submit-btn').click(); 
    cy.get('ngb-popover-window').should('be.visible'); 
    cy.get('ngb-popover-window').contains('Please fill form with valid data').should('be.visible');
    cy.visit('http://localhost:4200');
  });
});
