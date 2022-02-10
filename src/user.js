import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';
import { writable } from 'svelte/store';

const server = require('http').createServer().listen(8080);

// Database
export const db = GUN({web: server});

// Gun User
export const user = db.user().recall({sessionStorage: true});

// Current User's username
export const username = writable('');

user.get('alias').on(v => username.set(v))

db.on('auth', async(event) => {
    const alias = await user.get('alias'); // username string
    username.set(alias);

    console.log(`signed in as ${alias}`);
});