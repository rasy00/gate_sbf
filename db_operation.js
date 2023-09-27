import mysql from "mysql";

const db_operation = {
  _openConnection: function () {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "gate_sbf",
    });

    this.connection.connect(function (err) {
      if (err) throw err;
    });

    return this.connection;
  },

  _result: function (result) {
    return result;
  },

  checking: async function (no_induk, callback) {
    await this._checkingClassX(no_induk, callback);
  },

  _checkingClassX: async function (no_induk, callback) {
    // open connection
    await this._openConnection();

    // operation
    this.connection.query("SELECT * from siswa_x where no_induk = ?", no_induk, function (error, results, fields) {
      if (error) console.log(error);
      else {
        if (results[0]) {
          callback(results);
          const no = results[0].akses + 1;
          // open connection
          db_operation._openConnection();
          db_operation.connection.query("UPDATE siswa_x SET akses = ? where no_induk = ?", [no, no_induk], function (error, results, fields) {
            if (error) console.log(error);
            else {
            }
          });
          // close connection
          db_operation.connection.end();
        } else {
          db_operation._checkingClassXi(no_induk, callback);
        }
      }
    });

    // close connection
    this.connection.end();
  },

  _checkingClassXi: async function (no_induk, callback) {
    // open connection
    await this._openConnection();

    // operation
    this.connection.query("SELECT * from siswa_xi where no_induk = ?", no_induk, function (error, results, fields) {
      if (error) console.log(error);
      else {
        if (results[0]) {
          callback(results);
          const no = results[0].akses + 1;
          // open connection
          db_operation._openConnection();
          db_operation.connection.query("UPDATE siswa_xi SET akses = ? where no_induk = ?", [no, no_induk], function (error, results, fields) {
            if (error) console.log(error);
            else {
            }
          });
          // close connection
          db_operation.connection.end();
        } else {
          db_operation._checkingClassXii(no_induk, callback);
        }
      }
    });

    // close connection
    this.connection.end();
  },

  _checkingClassXii: async function (no_induk, callback) {
    // open connection
    await this._openConnection();

    // operation
    this.connection.query("SELECT * from siswa_xii where no_induk = ?", no_induk, function (error, results, fields) {
      if (error) console.log(error);
      else {
        callback(results);
        if (results[0]) {
          const no = results[0].akses + 1;
          // open connection
          db_operation._openConnection();
          db_operation.connection.query("UPDATE siswa_xii SET akses = ? where no_induk = ?", [no, no_induk], function (error, results, fields) {
            if (error) console.log(error);
            else {
            }
          });
          // close connection
          db_operation.connection.end();
        }
      }
    });

    // close connection
    this.connection.end();
  },
};

export default db_operation;
