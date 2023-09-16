describe('E2E Test', () => {
  it('should insert title input, description input, press "Add Task" button', () => {
    
    cy.visit('http://localhost:3000'); 

    cy.get('input[id="title"]').type('Test Title');

    cy.get('input[id="description"]').type('Test Description');

    cy.get('button[id="add-task"]').click();

  });

  it('should press edit icon to open dialog,edit field and press Update button',()=>{
    cy.visit('http://localhost:3000'); 

    cy.get('svg[name="edit"]').first().click()

    cy.get('input[id="updateTitle"]').clear().type('Update task title');

    cy.get('input[id="updateDescription"]').clear().type('Update task description');

    cy.get('button[name="update"]').click();
  })
})

