const SwaggerParser = require('swagger-parser');

SwaggerParser.parse('2.json', (err, api) => {
    if (err) {
      console.error(err);
    } else {
      console.log(api);
    }
  });