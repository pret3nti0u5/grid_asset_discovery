const ActiveDirectory = require('activedirectory');
const config = {
    url: 'ldap://192.168.149.168:389',
    baseDN: 'CN=Administrator,CN=Users,DC=MARVEL,DC=local',
    username: 'Administrator',
    password: 'Something123!'
}
const ad = new ActiveDirectory(config);

var username = 'Administrator@MARVEL.local';
var password = 'Something123!';

ad.authenticate(username, password, function (err, auth) {
    if (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return;
    }

    if (auth) {
        console.log('Authenticated!');
    }
    else {
        console.log('Authentication failed!');
    }
});