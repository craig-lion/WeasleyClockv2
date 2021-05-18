const svgr = require('@svgr/core')
const bellatrix = require('./svg-export/HarryPotterWands-individual_bellatrix')
const svgCode = bellatrix
svgr(svgCode, { icon: true }, { typescript: true}, { componentName: 'BellatrixWand' }).then(jsCode => {
  console.log(jsCode)
})