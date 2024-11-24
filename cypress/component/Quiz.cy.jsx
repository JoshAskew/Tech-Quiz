// import React from 'react';
import Quiz from '../../client/src/components/Quiz';
import '@testing-library/cypress/add-commands';

describe('Quiz Component', () => {
  beforeEach(() => {
    // Intercept API call
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
  });

  it('displays the start quiz button initially', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('renders a question with answers after starting', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');

    // Check question and answer options
    cy.get('h2').should('exist');
    cy.get('button').should('have.length', 4); // Assuming 4 answers per question
  });

  it('updates to a new question after an answer is selected', () => {
    cy.mount(<Quiz />);
    
    // Start the quiz
    cy.get('button').contains('Start Quiz').click();
  
    // Capture the initial question text
    cy.get('h2').invoke('text').then((firstQuestionText) => {
      // Select the first answer
      cy.get('button').contains('1').click();
  
      // Verify that a new question is displayed (different from the first one)
      cy.get('h2').should('not.have.text', firstQuestionText).and('exist');
    });
  });

  it('loads the next question after selecting an answer', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');

    cy.get('h2').invoke('text').then((firstQuestionText) => {
      cy.get('button').contains('1').click();

      // Ensure a new question is loaded
      cy.get('h2').should('not.have.text', firstQuestionText).and('exist');
    });
  });
});
