describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preencha os campos obrigatórios e envia o fornulário', () => {
    cy.clock()     //congela o relogio do navegador

    const longText = Cypress._.repeat('Obrigado!, pelo apoio, aproveite o céu é o limite!!', 10)
    
    cy.get('[name="firstName"]').type('Augusto')
    cy.get('[name="lastName"]').type('Oliveira')
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('augustooliveira1406@gmail.com')
    cy.get('[name="open-text-area"]').type(longText, { delay: 0 })
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
    
    cy.tick(3000)       //avança no tempo
    
    cy.get('.success').should('not.be.visible')
     
  })

  it('exibe mensagem de erro ao submeter o formlário com um email com a formatação inválida', () => {
    cy.clock()

    cy.get('[name="firstName"]').type('Augusto')
    cy.get('[name="lastName"]').type('Oliveira')
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('augustooliveira1406@gmail')
    cy.get('[name="open-text-area"]').type('Teste de Email inválido com mensagem de erro')
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    
    cy.tick(3000)
    
    cy.get('.success').should('not.be.visible')    
  })

  it('campo telefone continua vazio quando preenchido com valor näo numérico', () => {
    cy.get(':nth-child(2) > [name="phone"]')
      .type('abcde')
      .should('have.value', '')   
  })

  it('exibe mensagem de erro quando o telefone se tona obrigatório mas näo é preenchido antes de enviar o formulário', () => {
    cy.clock()

    cy.get('[name="firstName"]').type('Augusto')
    cy.get('[name="lastName"]').type('Oliveira')
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('augustooliveira1406@gmail')
    cy.get('[name="open-text-area"]').type('Teste de campo telefone näo preenchido')
    cy.get('#check > [name="phone"]').click()
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')   
      
    cy.tick(3000)
    
    cy.get('.success').should('not.be.visible')
  })

  //utilizando o clear
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('[name="firstName"]')
      .type('Augusto')
      .should('have.value', 'Augusto')
      .clear()
      .should('have.value', '')
    cy.get('[name="lastName"]')
      .type('Oliveira')
      .should('have.value', 'Oliveira')
      .clear()
      .should('have.value', '')
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]')
      .type('augustooliveira1406@gmail.com')
      .should('have.value', 'augustooliveira1406@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('[name="open-text-area"]')
      .type('Teste de preenchimento e limpeza de campos')
      .should('have.value', 'Teste de preenchimento e limpeza de campos')
      .clear()
      .should('have.value', '')   
    cy.get('#check > [name="phone"]').click()
    cy.get(':nth-child(2) > [name="phone"]')
      .type('11996481333')
      .should('have.value', '11996481333')
      .clear()
      .should('have.value', '') 

    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')   
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')   
      
    cy.tick(3000)
    
    cy.get('.error').should('not.be.visible')
  })
  
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.clock()

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible') 
      
    cy.tick(3000)
    
    cy.get('.success').should('not.be.visible')
  })

  //TESTES COM CAMPO SELECT TEXTO-VALOR-INDICE
  it('selecione um produto (YoutTube) por seu texto', () => {
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
  })

  it('selecione um produto (Mentoria) por seu valor (value)', () => {
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
  })

  it('selecione um produto (Blog) por seu índice', () => {
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
  })

  //TIPO RADIO UTILIZANDO .check
  it('marca o tipo de atendimento "Feedback"', () => {
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('be.checked')
  })

  it('marcar cada tipo de atendimento', () => {
      cy.get('input[type="radio"]')
        .each(typeOfService => {
          cy.wrap(typeOfService)
            .check()
            .should('be.checked')
        })
  })

  //TIPO CHECKBOX UTILIZANDO .check .unchek
  it('marca ambos os checkboxes, depois desmcarca o último', () => {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
  })

  it('exibe mensagem de erro quando o telefone se tona obrigatório mas näo é preenchido antes de enviar o formulário com CHECK', () => {
    cy.get('[name="firstName"]').type('Augusto')
    cy.get('[name="lastName"]').type('Oliveira')
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('augustooliveira1406@gmail')
    cy.get('[name="open-text-area"]').type('Teste de campo telefone näo preenchido')
    cy.get('#check > [name="phone"]').check()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')   
  })

  //Realizando Upload de arquivos
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utiliando uma fixture para a qua foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  //abrindo arquivo em outra aba
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a', 'Política de Privacidade')
        .should('have.attr', 'href', 'privacy.html')
        .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.contains('a', 'Política de Privacidade')
        .invoke('removeAttr', 'target')
        .click()
      
        cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche o campo da área de texto usando o comando invoke', () => {  
    cy.get('[name="open-text-area"]')
      .invoke('val', 'Um texto qualquer')
      .should('have.value', 'Um texto qualquer')    
  })

 it('faz uma requisição HTTP', () => {  
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
    cy.get('@getRequest')
      .its('body')
      .should('be.include', 'CAC TAT')
  })

  it('encontra o gato escondido', () => {  
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
  })

})