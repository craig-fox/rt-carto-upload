const request = require('request')
const _config = require('./config')

const payload = {
    "connector": {
      "provider": "postgres",
      "connection": {
        "server":_config.db.host,
        "database":_config.db.name,
        "username":_config.db.user,
        "password":_config.db.password
      },
      "table": _config.db.table,
      "sql_query": _config.query
    }

    request.post(
        {
          url: _config.cartoUrl,
          form: payload
        },
        function (err, httpResponse, body) {
          console.log(err, body);
        }
    );