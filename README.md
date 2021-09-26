## Getting Started

### Development

#### Using Host Modules

This method requires `node version 12+` and `npm version 6.4+` installed on your machine.

```zsh
ssh -D <port> user@remote-host -f -q -N

sshuttle -N -r user@ip_of_remote_host:port --dns
# edit proxychains4.conf as
# socks4 127.0.0.1 1080
npm i                   #Install server side dependencies
npm run client-install  #Install client side dependencies
npm run dev             #You will have to setup all the required env variable in ./config/dev.env for this to work perfectly
```

This will start the react-dev-server on localhost on `port:3000` and the node-backend-server on `port:5000`.
You will have to setup your env variables in ./config/dev.env, which includes the server port.

You can also run the react-dev-server and node-backend-server separately using the following commands

```zsh
npm run server #Start node-backend-server on port 5000 using nodemon (auto server restart on code change)
npm run start  #Start node-backend-server on port 5000 using node (no auto reload)
npm run client #Start react-dev-server on port 3000
```

## Motivation

Grid

## Technologies Used

The platform has been developed using the **MERN** Stack. The exact use of each component of the MERN Stack and the technologies used have been described below

- **React** - Frontend for this app has been developed using ReactJS using [Create React App](https://github.com/facebook/create-react-app) bolierplate.

  - [**React Redux**](https://github.com/reduxjs/react-redux) - For State management.
  - [**React Router**](https://github.com/ReactTraining/react-router)
  - [**Axios**](https://github.com/axios/axios) - For making api requests to the backend.
  - [**Bulma CSS**](https://bulma.io/) - Helps in making the app responsive and gives the app a neat uniform look.

- **Express** - Backend for this app has been made using the [Express](https://expressjs.com/) framework.

- **MongoDB** - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) has been used for spinning up a free DB for this app.
  - [**mongoose**](https://mongoosejs.com/) - ODM library for MongoDB.
- [**nmap**](https://nmap.org/) - Open Source program for network scanning.
- [**arp-scan**](https://nmap.org/) - Open Source program for dealing with arp protocol.
