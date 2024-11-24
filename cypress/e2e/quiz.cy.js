describe('Quiz App End-to-End Test', () => {
    beforeEach(() => {
        // Intercept API call
        cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
        // Visit the game page
        cy.visit('/');
      });
    it('completes the full quiz flow', () => {
      // Visit the application
      cy.visit('/');
  
      // Ensure the Start Quiz button is visible
      cy.get('button').contains('Start Quiz').should('be.visible');
  
      // Start the quiz
      cy.get('button').contains('Start Quiz').click();
  
      // Answer all 10 questions
      for (let i = 1; i <= 10; i++) {
        // Verify question heading is visible
        cy.get('h2').should('be.visible').and('not.be.empty');
  
        // Select an answer (e.g., always choosing the first option for simplicity)
        cy.get('button').contains('1').click();
      }
  
      // Verify the quiz completion message and score
      cy.get('h2').contains('Quiz Completed').should('be.visible');
      cy.get('.alert-success').contains('Your score:').should('be.visible');
  
      // Start a new quiz
      cy.get('button').contains('Take New Quiz').click();
  
      // Ensure the new quiz starts with fresh questions
      cy.get('h2').should('not.be.empty'); // First question of the new quiz
      cy.get('button').contains('1').should('be.visible');
      cy.get('button').contains('2').should('be.visible');
      cy.get('button').contains('3').should('be.visible');
      cy.get('button').contains('4').should('be.visible');
    });
  });
  