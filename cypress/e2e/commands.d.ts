// cypress/support/commands.d.ts

declare namespace Cypress {
    interface Chainable {
      visitCheckoutPage(): Chainable<void>;
      fillCheckoutForm(user: {
        firstName: string;
        lastName: string;
        email: string;
        country: string;
        street: string;
        city: string;
        state: string;
        zipcode: string;
      }): Chainable<void>;
      fillCreditCardInfo(card: {
        type: string;
        name: string;
        number: string;
        ccv: string;
        expMonth: string;
        expYear: string;
      }): Chainable<void>;
      submitCheckoutForm(): Chainable<void>;
      validateFormErrors(): Chainable<void>;
      formInvalidationPopover(): Chainable<void>;
    }
  }
  