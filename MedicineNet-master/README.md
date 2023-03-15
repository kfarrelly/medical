# Hyperledger Sawtooth Application - Medicine Net

This is a distributed application to help you trace the provenance and other
contextual information of any Medicine. This distributed application runs on top of Hyperledger
Sawtooth, an enterprise blockchain. 

## Contents

- [Components](#components)
- [Usage](#usage)
  - [Start Up](#start-up)
  - [Running Scripts in the Shell](#running-scripts-in-the-shell)
  - [Configuring API Keys and Secrets](#configuring-api-keys-and-secrets)
- [Development](#development)
  - [Restarting Components](#restarting-components)
  - [Manually Building Generated Files](#manually-building-generated-files)
- [Documentation](#documentation)
- [License](#license)

## Components

Running alongside the core components from Hyperledger Sawtooth, Supply Chain
includes a number of elements customizing the blockchain and user interaction
with it:

- a **transaction processor** which handles Supply Chain transaction logic
- a **proxy server** which provides an HTTP/JSON API for Supply Chain actions
- the **MedicineNet** for tracking and updating medicine status
- a **shell** container with the dependencies to run any commands and scripts
- a **server** which provides an HTTP/JSON API and validate credentials(PRIVATE_KEY and Public Key)

## Usage

This project utilizes [Docker](https://www.docker.com/what-docker) to simplify
dependencies and deployment. After cloning this repo, follow the instructions
specific to your OS to install and run whatever components are required to use
`docker` and `docker-compose` from your command line. This is only dependency
required to run Supply Chain components.

### Start Up

Once Docker is installed and you've cloned this repo, navigate to the root
project directory and run:

```bash
docker-compose up
```

This will take awhile the first time it runs, but when complete will be running
all required components in separate containers. Many of the components will be
available through HTTP endpoints, including:

- The Supply Chain REST API will be at **http://localhost:80**
- MedicineNet will be at **http://localhost:4004**
- Sawtooth's blockchain REST API will be available at **http://localhost:8008**

You also need to start Rest API Server for providing API to end user/website, for that open new terminal and navigate to the root
project directory and run:

```bash
 cd API && npm install && npm i -g nodemon && nodemon server.js 
 ```

In bash you can shutdown these components with the key combination: `ctrl-C`.
You can shutdown _and_ remove the containers (destroying their data), with the
command:

```bash
docker-compose down
```

### Running Scripts in the Shell

Running `docker-compose up`, will automatically run all scripts necessary to
use all Supply Chain components. However if you want to run any additional
scripts, such as scripts to automatically update sample blockchain data, a shell
container is provided with all necessary dependencies installed. To enter the
shell, simply open a terminal window and run:

```bash
docker exec -it medicine-shell bash
```

You can customize how many updates are submitted per minute with the `RATE`
environment variable (default 6), and use `LIMIT` to stop the updates after a
certain number are submitted (default 25):

```bash
RATE=3 LIMIT=10 npm run update-sample-assets
```

If you just want to exit the shell, you can simply run:

```bash
exit
```

### Configuring API Keys and Secrets

Server will handling (creation and validation) of public and private key for users.

- **PRIVATE_KEY**: must be 64 random hexadecimal characters

## Development

### Restarting Components

The default Docker containers use the `volumes` command to link directly to the
source code on your host machine. As a result any changes you make will
immediately be reflected in Supply Chain components without having to rebuild
them. However, typically you _will_ have to restart a component before it can
take advantage of any changes. Rather than restarting every container, you can
restart a single component from separate terminal using the container name. For
example:

```bash
docker restart validator
```

The available container names include:
- medicine-shell
- medicine-proxyserver
- medicine-tp
- settings-tp
- rest-api
- validator

## Run Steps:
### Network UP
1. Terminal1: `cd MedicineNet && docker-compose -f docker-compose.yaml up --build`
2. Terminal2: `cd MedicineNet/API && npm install && npm i -g nodemon && nodemon server.js` 


### Require
1. Docker 
2. Docker-Compose
3. node V8
