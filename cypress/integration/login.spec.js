/// <reference types="Cypress" />

context('Login', () => {
	before(() => {
		
		cy.viewport(1920, 1080) 
		cy.clearCookies('token', 'qrcode');
		cy.clearLocalStorage();
		cy.window().then((win) => {
  				win.sessionStorage.clear()
		});
	});

	it('logs in successfully, then navigates to profile', () => {
		cy.visit('/');
		// cy.contains('Sign Up').click();
		// cy.get(':nth-child(2) > a').click();
		// cy.get('form').within(() => {
		//  	cy.get('input[name="email"]').type('e2e2-testing@swaap.co')
		//  	cy.get('input[name="password"]').type('S#(]Kg(|sG832')
		//  	cy.get('.auth0-lock-submit').click()
		// 	cy.get('#allow').click()
		//  })
		cy.contains('Login').click()
		cy.get('form').within(() => {
			cy.get('input[name="email"]').type('e2e-testing@swaap.co')
			cy.get('input[name="password"]').type('S#(]Kg(|sG83')
			cy.get('.auth0-lock-submit').click()
		})
		cy.contains('Notifications');
		cy.contains('Swaap QR Code');
		cy.get('.py-8 > :nth-child(1) > .mt-8 > [href="/profile"] > .flex > .uppercase').click();
		cy.location('pathname').should('include', 'profile');
		cy.title().should('include', 'Swaap')
		cy.get('[data-cy=edit-profile] > path').click({force:true});
		cy.location('pathname').should('include', 'profile/edit');
		cy.get('#jobtitle').clear().type('job title')
		cy.get('#industry').clear().type('tech')
		cy.get('#location').clear().type('location')
		cy.get('#tagline').clear().type('tagline')
		cy.get('#bio').clear().type('bio')
		cy.get('.text-blue-700').click()
		
	});
	
});
