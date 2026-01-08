const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {},
  //id do Cypress Cloud
  projectId: "odd3p1",
})

