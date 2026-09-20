describe ('OrangeHRM login page test', () => {
  it('LP-01 OrangeHRM login page UI test', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('link[rel="icon"]').should('have.attr', 'href').and('include', 'favicon.ico')
    cy.get('.orangehrm-login-logo').should('be.visible')
    cy.get('.orangehrm-login-branding').should('be.visible')
    cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('be.visible').and('have.text', 'Login');
  })
//   it('LP-02 OrangeHRM website redirection test',() => {
//     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
//     cy.get('a[href="orangehrm"]').should('have.href', 'www.orangehrm.com');
//   })
  it('LP-03 Field validation for empty fill in the Login page', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').should('be.visible').clear()
    cy.get('input[name="password"]').should('be.visible').clear()
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-group').contains('Username').parents('.oxd-input-group').find('.oxd-input-field-error-message').should('be.visible').and('have.text', 'Required')
    cy.get('.oxd-input-group').contains('Password').parents('.oxd-input-group').find('.oxd-input-field-error-message').should('be.visible').and('have.text', 'Required');
  })
  it('LP-04 Login using non-registered account ', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').should('be.visible').type('AIUEO')
    cy.get('input[name="password"]').should('be.visible').type('pasword123')
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content').should('be.visible').and('have.text', 'Invalid credentials');
  })
  it('LP-05 Login using registered account but wrong password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').should('be.visible').type('Admin')
    cy.get('input[name="password"]').should('be.visible').type('wrongpassword')
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content').should('be.visible').and('have.text', 'Invalid credentials');
  })
  it('LP-06 Login using non-registered account and correct password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').should('be.visible').type('AIUEO')
    cy.get('input[name="password"]').should('be.visible').type('admin123')
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content').should('be.visible').and('have.text', 'Invalid credentials');
  })
  it('LP-07 Login using registered account and password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').should('be.visible').type('Admin')
    cy.get('input[name="password"]').should('be.visible').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('contain', '/dashboard');
  })
    it('LP-08 Forgot your password? button hyperlink', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('.orangehrm-login-forgot-header').should('be.visible').click()
    cy.url().should('contain', '/requestPassword');
  })
  it('LP-09 Field validation for empty fill in Forgot Password page', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode')
    cy.get('input[name="username"]').should('be.visible').clear()
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-group').contains('Username').parents('.oxd-input-group').find('.oxd-input-field-error-message').should('be.visible').and('have.text', 'Required')
  })
  it('LP-10 Cancel button redirection in Forgot Password page', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode')
    cy.get('button[type="button"]').click();
    cy.url().should('contain', '/login');
  })
//     it('LP-11 Reset password for unregistered account', () => {
//     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode')
//     cy.get('input[name="username"]').should('be.visible').type('1234567890')
//     cy.get('button[type="submit"]').click();
//     cy.get('.oxd-alert-content').should('be.visible').and('have.text', 'User not found');
//   })
  it('LP-12 Reset password for registered account', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode')
    cy.get('input[name="username"]').should('be.visible').type('UserA')
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-text').should('be.visible').and('contain.text', 'successfully');
  })
})