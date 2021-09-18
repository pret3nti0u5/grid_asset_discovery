stdout1 = `Starting Nmap 7.92 ( https://nmap.org ) at 2021-09-12 11:02 +04
Nmap scan report for Linksys18935 (192.168.1.1)
Host is up (0.44s latency).

PORT      STATE SERVICE     VERSION
53/tcp    open  domain      dnsmasq 2.78
80/tcp    open  http        lighttpd 1.4.39
|_http-server-header: lighttpd/1.4.39
139/tcp   open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
443/tcp   open  ssl/http    lighttpd 1.4.39
445/tcp   open  netbios-ssn Samba smbd 3.0.28a (workgroup: WORKGROUP)
8080/tcp  open  http        lighttpd 1.4.39
|_http-server-header: lighttpd/1.4.39
10000/tcp open  http        lighttpd 1.4.39
|_http-server-header: lighttpd/1.4.39
49152/tcp open  upnp        Portable SDK for UPnP devices 1.6.19 (Linux 3.14.77; UPnP 1.0)
49153/tcp open  upnp        Cisco-Linksys E4200 WAP upnpd (UPnP 1.0)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel:3.14.77, cpe:/h:cisco:e4200

Host script results:
| smb-os-discovery: 
|   OS: Unix (Samba 3.0.28a)
|   NetBIOS computer name: 
|   Workgroup: WORKGROUP\x00
|_  System time: 2021-09-12T07:03:33+00:00

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 153.75 seconds`


os = stdout1.match(/OS details: .+/i);
if(os === null){
    os = stdout1.match(/OS: .+/i)[0];
    os = os.match(/[a-zA-Z]+;/i)[0].split(';')[0]
    console.log(os)
}
console.log("matched part=" + os)
// if (os) {
//     // os = os[0].match(/[a-zA-Z]+;$/i)[0].split(';')[0];
//     os = os[0].split(":")[1]
// }
console.log("os is " + os);