import SimpleLDAP from 'simple-ldap-search';

const config = {
	url: 'ldap://192.168.1.11:7000', //URL of the LDAP service
	base: 'DC=MARVEL,DC=local', //base to look from
	dn: 'tstark@MARVEL.local', //the username of user from ad (eg: tstark@MARVEL.local)
	password: 'Something123!', //password of the above user
};

const filter = '(objectClass=computer)';
const attributes = ['name'];

export default function ldapSeacrh(net_bios_name) {
	return new Promise((resolve, reject) => {
		const ldap = new SimpleLDAP(config);
		let domain = '';
		ldap
			.search(filter, attributes)
			.then((mess) => {
				mess.forEach((element) => {
					if (element['name'] === net_bios_name) {
						let j = element['dn'].replace('DN=""').replace('CN="').split(',');
						j.splice(0, 2);
						j.forEach((ele) => {
							domain += ele.split('=')[1] + '.';
						});

						resolve(domain);
					}
				});
				resolve(domain);
				ldap.destroy();
			})
			.catch((err) => console.log(err));
	});
}
