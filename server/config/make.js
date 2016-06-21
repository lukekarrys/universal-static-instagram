/* global Promise:false */

'use strict';

import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import {instagram} from 'instagram-node';
import {green} from 'colors/safe';
import {find, assign, map} from 'lodash';
import {stripIndent} from 'common-tags';
import {token} from 'instagram-download';

const configPath = path.resolve(__dirname, '..', '..', 'config.json');
const required = (value) => value ? true : 'This is required.';
const message = (...templ) => `${stripIndent(...templ)}\n`;

const save = (...objs) => {
  fs.writeFileSync(configPath, JSON.stringify(assign(...objs), null, 2));
  process.stdout.write(green('Done!'));
  // eslint-disable-next-line no-process-exit
  process.exit(0);
};

const q = {
  clientId: {
    type: 'input',
    name: 'client',
    validate: required,
    message: message`
      ${green('What is the id of your Instagram client application?')}
      If you don't have one you can register a new one here:

      https://instagram.com/developer/clients/register/

      Make sure you create a valid redirect URI for http://localhost:3003/
    `
  },
  clientSecret: {
    type: 'input',
    name: 'secret',
    validate: required,
    message: message`
      ${green('What is the secret of your Instagram client application?')}
    `
  },
  token: (data) => ({
    type: 'input',
    name: 'token',
    message: message`
      Press ${green('ENTER')} to start the authorization flow (will open a browser window)
    `,
    filter: () => token({...data, port: 3003})
  }),
  user: (data) => ({
    type: 'input',
    name: 'user',
    validate: required,
    message: message`
      What is the username of the Instagram user?
    `,
    filter: (username) => new Promise((resolve, reject) => {
      const ig = instagram();
      // eslint-disable-next-line camelcase
      ig.use({access_token: data.token});
      ig.user_search(username, (err, users = []) => {
        if (err) return reject(err);
        if (!users.length) return reject(new Error('That search returned no results'));
        const user = find(users, 'username', username);
        if (!user) return reject(new Error(`No users could be found with that username. Found ${map(users, 'username').join(',')}`));
        return resolve(user.id);
      });
    })
  }),
  domain: {
    type: 'input',
    name: 'domain',
    message: message`
      What domain do you want to host this at? (optional)
    `
  }
};

inquirer.prompt([q.clientId, q.clientSecret]).then((clientData) =>
  inquirer.prompt([q.token(clientData)]).then((tokenData) =>
    inquirer.prompt([q.user(tokenData), q.domain]).then((answers) => save(clientData, tokenData, answers))
  )
);
