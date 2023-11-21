require('dotenv').config()

module.exports = {
    development: {
        "username": process.env.DEV_PGUSER,
        "password": process.env.DEV_PGPASSWORD,
        "database": process.env.DEV_PGDATABASE,
        "host": process.env.DEV_PGHOST,
        "port": process.env.DEV_PGPORT,
        "dialect": "postgres"
    },
    test: {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    production: {
        "username": process.env.PGUSER,
        "password": process.env.PGPASSWORD,
        "database": process.env.PGDATABASE,
        "host": process.env.PGHOST,
        "port": process.env.PGPORT,
        "dialect": "postgres"
    }
};