const config = {};
const pgp = require("pg-promise")(config);

const params = {
  host: 'localhost',
  port: 5432,
  database: 'dbtest',
  user: 'postgres',
  password: '123',
  max: 30
};

const DB = pgp(params);
console.log("Connect to PostgresSQL: " + DB);

module.exports = {
  user: {
    add: async (data) => {
      let res = {};
      try {
        res = await DB.one(
          "INSERT INTO users(UserId, Username, Password, Fullname, Token, Address) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
          [
            data.UserId,
            data.Username,
            data.Password,
            data.Fullname,
            data.Token,
            data.Address
          ]
        );
      } catch (ex) {
        console.log(ex);
      }
      return res;
    },
    findByName: async (username) => {
      let user = {};
      try {
        user = await DB.one("SELECT * FROM Users WHERE Username=$1", [username]);
      } catch (e) {
        console.log(e);
      }
      return user;
    },
  },
  categories: {
    all: async () => {
      let categories = [];
      try {
        categories = await DB.any('SELECT * FROM "Categories"');
      } catch (ex) {
        console.log(ex);
      }
      return categories;
    }
  },
  products: {
    all: async () => {
      let products = [];
      try {
        products = await DB.any('SELECT * FROM "Products"');
      } catch (ex) {
        console.log(ex);
      }
      return products;
    }
  }
};
