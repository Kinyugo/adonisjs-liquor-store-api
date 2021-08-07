# Liquor Store API

An AdonisJS API for managing a liquor store.

## Get Started

1. Clone the repo to your host machine.

```bash
git clone https://github.com/Kinyugo/adonisjs-liquor-store-api
```

2. Install the dependencies

```bash
yarn install | npm install
```

3. Setup the database:
   - Copy the `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Edit the `.env` config files to reflect your machine configuration
   ```env
   PORT=3333
   HOST=0.0.0.0
   NODE_ENV=development
   APP_KEY=t6Av1-tUh0PghyCycZ47__YX8rivIko2
   DB_CONNECTION=mysql
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=<YOUR_DB_USER>
   MYSQL_PASSWORD=<YOUR_DB_PASSWORD>
   MYSQL_DB_NAME=liquor_store
   ```
   - Run migrations to create the tables.
   ```bash
   node ace migration:run
   ```
   - Optionally seed the database with dummy data
   ```bash
   node ace db:seed
   ```
4. Start the server
   ```bash
   node ace serve
   ```
