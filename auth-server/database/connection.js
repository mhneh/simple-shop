const config = {};
const pgp = require('pg-promise')(config);

const params = {
  host: 'localhost',
  port: 5432,
  database: 'simple-shop',
  user: 'postgres',
  password: 'changeme',
  max: 30
};

const DB = pgp(params);
console.log("Connect to PostgresSQL: " + DB);

module.exports = {
  user: {
    add: async (data) => {
      let res = {};
      try {
        res = await DB.one('INSERT INTO users(id, username, password) VALUES($1, $2, $3) RETURNING *',
          [data.uid, data.username, data.password]);
      } catch (ex) {
        console.log(ex);
      }
      return res;
    },
    findByUsername: async (username) => {
      let user = {};
      try {
        user = await DB.one('SELECT * FROM users WHERE username=$1', [username]);
      } catch (e) {
        console.log(e);
      };
      return user;
    }
  }
};
