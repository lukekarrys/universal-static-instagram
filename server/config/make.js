/* global Promise:false */

'use strict';

import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import {instagram} from 'instagram-node';
import {green} from 'colors/safe';
import {find, assign} from 'lodash';
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

      Make sure you create a valid redirect URI for http://localhost:3001/
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
  accessToken: (data) => ({
    type: 'input',
    name: 'access_token',
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
      ig.use(data);
      ig.user_search(username, (err, users = []) => {
        if (err) return reject(err);
        const user = find(users, 'username', username);
        if (!user) return reject(new Error('No users could be found with that username.'));
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

inquirer.prompt([q.clientId, q.clientSecret]).then((client) =>
  inquirer.prompt([q.accessToken(client)]).then((accessToken) =>
    inquirer.prompt([q.user(accessToken), q.domain]).then((answers) => save(client, token, answers))
  )
);
