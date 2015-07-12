'use strict';

import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import {instagram} from 'instagram-node';
import colors from 'colors/safe';
import find from 'lodash/collection/find';

const configPath = path.resolve(__dirname, '..', 'config.json');
const clientMessage = colors.bold('What is the id of your Instagram client application?');
const secretMessage = colors.bold('What is the secret of your Instagram client application?');
const clientHelp = 'If you don\'t have one you can register a new one here:\nhttps://instagram.com/developer/clients/register/';
const clientValidator = (value) => value ? true : 'An Instagram client application is required. Please create one before proceeding.';
const userValidator = (value) => value ? true : 'A valid username is required to lookup the user id';
const newline = (str) => str + '\n';

let client_id, client_secret;

inquirer.prompt([
  {
    type: 'input',
    name: 'client',
    message: newline(clientMessage + '\n' + clientHelp),
    validate: clientValidator,
    filter: (value) => { client_id = value; return value; }
  },
  {
    type: 'input',
    name: 'secret',
    message: newline(secretMessage),
    validate: clientValidator,
    filter: (value) => { client_secret = value; return value; }
  },
  {
    type: 'input',
    name: 'user',
    message: newline('What is the username of the Instagram user?'),
    validate: userValidator,
    filter: function filterUser (username) {
      const done = this.async();
      const ig = instagram();
      ig.use({client_id, client_secret});
      ig.user_search(username, (err, users) => {
        if (err) return done(err);
        const user = find(users, 'username', username);
        done(user ? user.id : new Error('No users could be found with that username.'));
      });
    }
  },
  {
    type: 'input',
    name: 'domain',
    message: newline('What domain do you want to host this at? (optional)')
  }
], (answers) => {
  const data = JSON.stringify(answers, null, 2);
  fs.writeFileSync(configPath, data);
  process.stdout.write(colors.green('Done!'));
});
