//const ActiveDirectory = require('activedirectory');

import SimpleLDAP from 'simple-ldap-search';

// SimpleLDAP = ldap1.SimpleLDAP
const config = {
    url: 'ldap://192.168.1.33:389',
    base: 'DC=MARVEL,DC=local',
    dn: 'tstark@MARVEL.local',
    password: 'Something123!'
}
// const ad = new ActiveDirectory(config);

var username = 'Administrator@MARVEL.local';
var password = 'Something123!';

// ad.authenticate(username, password, function (err, auth) {
//     if (err) {
//         console.log('ERROR: ' + JSON.stringify(err));
//         return;
//     }

//     if (auth) {
//         console.log('Authenticated!');
//     }
//     else {
//         console.log('Authentication failed!');
//     }
// });

const ldap = new SimpleLDAP(config);


// setup a filter and attributes for your LDAP query
const filter = '(objectClass=computer)';
const attributes = ['name']




ldap.search(filter, attributes).then((mess) => { console.log(mess); ldap.destroy() })


