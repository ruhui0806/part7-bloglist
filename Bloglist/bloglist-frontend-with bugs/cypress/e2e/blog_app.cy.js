describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'CypressE2E',
      username: 'cypress',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#click-to-login').click()
    cy.contains('username')
  })


  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login({ username: 'cypress', password: 'salainen' })
      cy.contains('CypressE2E logged in')
    })

    it('fails with wrong credentials', function () {
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('#username').type('cypress')
      cy.get('#password').type('wrong')
      cy.get('#submit').click()
      cy.get('.notification').and('have.css', 'color', 'rgb(255, 0, 0)')
      // cy.contains('Wrong username')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'cypress', password: 'salainen' })
      cy.contains('CypressE2E logged in')
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#input-title').type('a blog created by cypress-title')
      cy.get('#input-author').type('cypress-author')
      cy.get('#input-url').type('www.cypress.com')
      cy.get('#create-blog').click()
      cy.contains('a blog created by cypress')
    })

    it('Users can like a blog', function () {
      cy.contains('new blog').click()
      cy.get('#input-title').type('a blog created by cypress-title2')
      cy.get('#input-author').type('cypress-author')
      cy.get('#input-url').type('www.cypress2.com')
      cy.get('#create-blog').click()
      cy.contains('a blog created by cypress')
      cy.get('#view-button')
        .click()
      cy.get('#like-button')
        .click()
    })

    it('user who created a blog can delete it', function () {
      cy.contains('new blog').click()
      cy.get('#input-title').type('a blog created by cypress-title2')
      cy.get('#input-author').type('cypress-author')
      cy.get('#input-url').type('www.cypress2.com')
      cy.get('#create-blog').click()
      cy.contains('a blog created by cypress')
      cy.get('#view-button')
        .click()
      cy.get('#delete-button')
        .click()
      cy.get('#view-button').should('not.exist')
      cy.contains('Remove blog')
    })

    it.only('blogs are ordered according to likes', function () {
      cy.contains('new blog').click()
      cy.get('#input-title').type('The title with the most likes')
      cy.get('#input-author').type('cypress-author')
      cy.get('#input-url').type('www.cypress2.com')
      cy.get('#create-blog').click()
      cy.contains('new blog').click()
      cy.get('#input-title').type('The title with the 2nd most likes')
      cy.get('#input-author').type('cypress-author2')
      cy.get('#input-url').type('www.cypress22.com')

      cy.get('#create-blog').click()
      cy.get('#view-button')
        .click()
      cy.get('#like-button').click().click().click()
      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')

    })




  })

})



// describe('Blog app', function () {
//   beforeEach(function () {
//     // cy.visit('http://localhost:3000')
//     // cy.contains('login').click()
//     // cy.get('#username').type('cypress')
//     // cy.get('#password').type('salainen')
//     // cy.get('#submit').click()

//     cy.login({ username: 'cypress', password: 'salainen' })
//   })

//   // it('front page can be opened', () => {
//   //   cy.contains('loginUser2 logged in')
//   // })
//   // Mocha recommends that arrow functions are not used, because they might cause some issues in certain situations
//   // it('a new blog can be created', function () {
//   //   cy.contains('CypressE2E logged in')
//   //   cy.contains('new blog').click()
//   //   cy.get('#input-title').type('a blog created by cypress-title')
//   //   cy.get('#input-author').type('cypress-author')
//   //   cy.get('#input-url').type('www.cypress.com')
//   //   cy.get('#create-blog').click()
//   //   cy.contains('a blog created by cypress')
//   // })
// })

