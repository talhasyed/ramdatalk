import {
  contains,
  filter,
  equals,
  propSatisfies,
  complement,
  compose
} from "ramda";

const usersFromApi = require("./users.json");

// 30s
const is30Plus = ({ age }) => age >= 30;
const in30sUsers = filter(is30Plus);

// fulltimers
const isPropTrue = prop => propSatisfies(equals(true), prop);
const isFullTime = isPropTrue("fulltime");
const isNotFulltime = complement(isFullTime);
const fullTimers = filter(isFullTime);
const nonFulltimers = filter(isNotFulltime);

//
// ~~~NEW STUFF FOLLOWS~~
//

// languages
const knowsLanguage = language => contains(language);
const userKnowsLanguage = language =>
  propSatisfies(knowsLanguage(language), "languages");
const usersWithLanguage = language => filter(userKnowsLanguage(language));

// Construct the function that extracts the users
const resultQuery = compose(
  usersWithLanguage("c++"),
  fullTimers,
  in30sUsers
);

const filteredUsers = resultQuery(usersFromApi);
console.log(JSON.stringify(filteredUsers));
