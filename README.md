# OSlash Clone

**NPM Commands**

```shell
$ npm run <options>

OPTIONS:

build         - Builds the app for production

dev           - Starts the development server

start         - Starts the production server
```

# Install, Configure & Run

Below mentioned are the steps to install, configure & run in your machine.

```bash
# Clone the repo.
git clone https://github.com/itizarsa/oslash-clone.git

# Goto the cloned project folder.
cd oslash-clone
```

```bash
# Note: It is preassumed here that you have mongodb running in background & you have created the database.

# Install NPM dependencies.
npm install

# Edit your DotEnv file using any editor of your choice.
# Note: You should add all the variable defined in .env.sample file
vim .env

# Run the app
npm run dev
```
