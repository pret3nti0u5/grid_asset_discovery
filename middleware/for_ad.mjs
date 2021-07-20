//const ActiveDirectory = require('activedirectory');

import SimpleLDAP from 'simple-ldap-search';

// SimpleLDAP = ldap1.SimpleLDAP
const config = {
    url: 'ldap://192.168.1.33:389', //URL of the LDAP service
    base: 'DC=MARVEL,DC=local', //base to look from
    dn: 'tstark@MARVEL.local', //the username
    password: 'Something123!' //password
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




ldap.search(filter, attributes).then((mess) => {
    mess.forEach(element => {
        let domain = '';
        // console.log(element)
        if (element["name"] === "TONY-STARK") {
            let j = element["dn"].replace('DN=""').replace('CN="').split(','); j.splice(0, 2); j.forEach(ele => {
                domain += ele.split('=')[1] + '.'
            });
            console.log(domain)
        }
    });; ldap.destroy()
})


