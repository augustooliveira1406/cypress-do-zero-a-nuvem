# Cypress do Zero à Nuvem 🚀

![Cypress](https://img.shields.io/badge/Cypress-E2E-green)
![Node](https://img.shields.io/badge/Node.js-LTS-brightgreen)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)

Projeto desenvolvido durante o curso **Cypress do Zero à Nuvem**, com foco em automação de testes end-to-end utilizando **Cypress**, seguindo boas práticas de organização, execução local e preparação para execução em pipelines CI/CD.

---

## 🎯 Objetivo do Projeto

- Aprender Cypress do nível básico ao avançado  
- Criar testes automatizados E2E confiáveis  
- Executar testes em modo visual e headless  
- Preparar o projeto para execução em pipelines (CI/CD)  
- Documentar corretamente um projeto de automação  

---

## 📋 Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

### 🔹 Node.js (Obrigatório)
- Versão recomendada: **LTS**
- Verificar instalação:

node -v
npm -v
git --version

---

## 📦 Instalação do Projeto


## Clone o repositório:
git clone <URL_DO_REPOSITORIO>

### Acesse o diretório do projeto:
cd cypress-do-zero-a-nuvem
Instale as dependências:
npm install

---

## 🧪 Executando os Testes
### ▶️ Modo Interativo (Viewport / UI)
Modo indicado para desenvolvimento e depuração dos testes, pois permite visualizar a execução passo a passo.
npx cypress open
Ou, caso exista script configurado:
npm run cy:open

📌 Características:
Interface gráfica do Cypress
Execução individual dos testes
Visualização em tempo real

### ⚡ Modo Headless (Sem Interface Gráfica)
Modo indicado para CI/CD, pipelines e execuções automatizadas.
npx cypress run
Ou via script:
npm run cy:run

📌 Características:
Execução em segundo plano
Resultados exibidos no terminal
Geração automática de vídeos e screenshots em caso de falha

---

## 🧱 Estrutura do Projeto
cypress/
 ├── e2e/                 # Casos de teste E2E
 ├── fixtures/            # Massa de dados (mocks)
 ├── support/             # Commands customizados e configurações globais
 ├── videos/              # Vídeos das execuções (headless)
 └── screenshots/         # Evidências de falha

⚙️ Scripts Disponíveis (package.json)
Exemplo de scripts utilizados no projeto:
"scripts": {
  "cy:open": "cypress open",
  "cy:run": "cypress run"
}

---

## 🚀 Execução em CI/CD (Exemplo – GitHub Actions)
Exemplo de pipeline simples para rodar os testes automaticamente:
name: Cypress Tests

on:
  push:
    branches: [ "main" ]
  pull_request:

jobs:
  cypress-run:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Instalar dependências
        run: npm install

      - name: Executar testes Cypress (headless)
        run: npx cypress run
📌 Esse pipeline executa automaticamente os testes a cada push ou pull request.

---

## 🛠 Tecnologias Utilizadas
Cypress
JavaScript
Node.js
npm
Git
GitHub Actions (CI/CD)

---

## 📌 Boas Práticas Aplicadas
Testes independentes
Uso de fixtures para dados
Commands customizados
Execução headless para pipelines
Documentação clara e objetiva

---

## 📞 Contato
#### 👤 Augusto Oliveira
💼 QA / QA Automation Engineer
#### 📧 Email: augustooliveira1406@gmail.com
#### 🔗 LinkedIn: https://www.linkedin.com/in/augustooliveiraqa
#### 🐙 GitHub: https://github.com/augustooliveira1406

