const fs = require('fs');

// Reading the API specification file
const apiSpec = JSON.parse(fs.readFileSync('api_spec.json', 'utf-8'));

// Checking rule 1: All the API request/response parameters should have a ‘description’
let hasDescription = true;
function checkDescription(obj) {
  for (const prop in obj) {
    if (typeof obj[prop] === 'object') {
      checkDescription(obj[prop]);
    } else {
      if (prop === 'description') {
        continue;
      } else {
        hasDescription = false;
        break;
      }
    }
  }
}
checkDescription(apiSpec);
if (!hasDescription) {
  console.log('Voilation: Not all API request/response parameters have a description');
}

// Checking rule 2: All the API request/response fields should have a ‘example’ value
let hasExample = true;
function checkExample(obj) {
  for (const prop in obj) {
    if (typeof obj[prop] === 'object') {
      checkExample(obj[prop]);
    } else {
      if (prop === 'example') {
        continue;
      } else {
        hasExample = false;
        break;
      }
    }
  }
}
checkExample(apiSpec);
if (!hasExample) {
  console.log('Voilation: Not all API request/response fields have an example value');
}

// Checking rule 3: Each model used in the API request should have at least one field marked as mandatory/required
let hasMandatoryField = true;
function checkMandatory(obj) {
  for (const prop in obj) {
    if (typeof obj[prop] === 'object') {
      if (prop === 'required' && Array.isArray(obj[prop]) && obj[prop].length > 0) {
        hasMandatoryField = true;
        break;
      } else {
        checkMandatory(obj[prop]);
      }
    }
  }
}
checkMandatory(apiSpec);
if (!hasMandatoryField) {
  console.log('Voilation:"Each model used in the API request does not have at least one field marked as mandatory/required');
}
