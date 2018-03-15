import { filter, equals, propSatisfies, complement, compose } from "ramda";

const usersFromApi = require("./users.json");

// 30s
const in20s = ({ age }) => age >= 20 && age <= 30;
const in20sUsers = filter(in20s);

// fulltimers
const isPropTrue = prop => propSatisfies(equals(true), prop);
const isFullTime = isPropTrue("fulltime");
//
// ~~~NEW STUFF FOLLOWS~~
//
const isNotFulltime = complement(isFullTime);
const fullTimers = filter(isFullTime);
const nonFulltimers = filter(isNotFulltime);

// Construct the function that extracts the users
const resultQuery = compose(nonFulltimers, in20sUsers);

const filteredUsers = resultQuery(usersFromApi);
console.log(JSON.stringify(filteredUsers));
