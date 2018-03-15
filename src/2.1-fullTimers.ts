import { filter, equals, propSatisfies, compose } from "ramda";

const usersFromApi = require("./users.json");

// 30s
const is30Plus = ({ age }) => age >= 30;
const in30sUsers = filter(is30Plus);

//
// ~~~NEW STUFF FOLLOWS~~
//

// fulltimers
const isPropTrue = prop => propSatisfies(equals(true), prop);
const isFullTime = isPropTrue("fulltime");
const fullTimers = filter(isFullTime);

// Construct the function that extracts the users
const resultQuery = compose(fullTimers, in30sUsers);

const filteredUsers = resultQuery(usersFromApi);
console.log(JSON.stringify(filteredUsers));
