describe ('OrangeHRM login page test', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  })

  //Verify the url of the OrangeHRM login page
  it('LP-01 Verify the url of the OrangeHRM login page', () => {
    cy.url().should('contain', '/auth/login');
  })

  //Verify favicon logo
  it('LP-02 Verify favicon logo', () => {
    cy.get('link[rel="icon"]').should('have.attr', 'href').and('contain', 'favicon.ico');
  })
  
  //Verify OrangeHRM branding
  it('LP-03 Verify OrangeHRM branding', () => {
    cy.get('.orangehrm-login-branding').should('be.visible')
  })

  //Verify OrangeHRM logo
  it('LP-04 Verify OrangeHRM logo', () => {
    cy.get('.orangehrm-login-logo').should('be.visible');
  })

  //Verify mandatory field validation in the login page  
  it('LP-05 Verify mandatory field validation in the login page', () => {
    cy.get('input[name="username"]').should('be.visible').clear()
    cy.get('input[name="password"]').should('be.visible').clear()
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-group')
      .contains('Username')
      .parents('.oxd-input-group')
      .find('.oxd-input-field-error-message')
      .should('be.visible')
      .and('have.text', 'Required');
    cy.get('.oxd-input-group')
      .contains('Password')
      .parents('.oxd-input-group')
      .find('.oxd-input-field-error-message')
      .should('be.visible')
      .and('have.text', 'Required');
  })

  //Verify login with registered password and empty username
  it('LP-06 Verify login with registered password and empty username', () => {
    cy.get('input[name="username"]').should('be.visible').clear()
    cy.get('input[name="password"]').should('be.visible').type('admin123')
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-group')
      .contains('Username')
      .parents('.oxd-input-group')
      .find('.oxd-input-field-error-message')
      .should('be.visible')
      .and('have.text', 'Required');
  })

  //Verify login with registered username and empty password
  it('LP-07 Verify login with registered username and empty password', () => {
    cy.get('input[name="username"]').should('be.visible').type('Admin')
    cy.get('input[name="password"]').should('be.visible').clear()
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-group')
      .contains('Password')
      .parents('.oxd-input-group')
      .find('.oxd-input-field-error-message')
      .should('be.visible')
      .and('have.text', 'Required');
  })

  //Verify login using non-registered account
  it('LP-08 Verify login using non-registered account ', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').should('be.visible').type('AIUEO')
    cy.get('input[name="password"]').should('be.visible').type('pasword123')
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content').should('be.visible').and('have.text', 'Invalid credentials');
  })

  //Verify login using registered account but wrong password
  it('LP-09 Verify login using registered account but wrong password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').should('be.visible').type('Admin')
    cy.get('input[name="password"]').should('be.visible').type('wrongpassword')
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content').should('be.visible').and('have.text', 'Invalid credentials');
  })

  //Verify login using non-registered account and correct password
  it('LP-10 Verify login using non-registered account and correct password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').should('be.visible').type('AIUEO')
    cy.get('input[name="password"]').should('be.visible').type('admin123')
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content').should('be.visible').and('have.text', 'Invalid credentials');
  })

  //Verify login using registered account and password
  it('LP-11 Verify login using registered account and password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').should('be.visible').type('Admin')
    cy.get('input[name="password"]').should('be.visible').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('contain', '/dashboard');
  })

  //Verify Forgot your password? button hyperlink
    it('LP-12 Verify Forgot your password? button hyperlink', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('.orangehrm-login-forgot-header').should('be.visible').click()
    cy.url().should('contain', '/requestPassword');
  })
})