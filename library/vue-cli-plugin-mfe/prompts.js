module.exports = [
  {
    type: 'list',
    name: 'import',
    message: 'How do you want to import Element?',
    choices: [
      { name: 'Fully import', value: 'full' },
      { name: 'Import on demand', value: 'partial' }
    ],
    default: 'full',
  },
  {
    when: answers => answers.import === 'full',
    type: 'confirm',
    name: 'customTheme',
    message: 'Do you wish to overwrite Element\'s SCSS variables?',
    default: false,
  },
  {
    type: 'input',
    name: 'pages',
    message: 'Input the comma-separated page names you want to create, eg: page1,page2',
    default: 'home'
  }
]
