const inquirer = require('inquirer');
const app = require('../app');

var url = '';

module.exports = {

  promptUserForURL: () => {
    const questions = [{
      name: 'choice',
      type: 'input',
      message: 'Enter a playlist url (make sure you mkdir exports)',
      validate: function(value) {
        if (value.length) {
          url = value;
          return true;
        } else {
          return 'You didnt type shit';
        }
      }
    }, {
      type: 'confirm',
      name: 'check',
      message: 'Are you sure?',
    }, {
      when: function(response) {
        if (response.choice === 'go') {
          message: app.start()
        }
      },
    }
  ];
    return inquirer.prompt(questions);
  },
  url: url,
};