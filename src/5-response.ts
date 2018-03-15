import {
  contains,
  filter,
  equals,
  propSatisfies,
  complement,
  compose,
  sortBy,
  prop,
  reverse,
  uniq,
  map,
  indexBy
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

// languages
const knowsLanguage = language => contains(language);
const userKnowsLanguage = language =>
  propSatisfies(knowsLanguage(language), "languages");
const usersWithLanguage = language => filter(userKnowsLanguage(language));

// sort by Name (Desc)
const sortByName = sortBy(prop("name"));
const sortByNameReversed = compose(reverse, sortByName);

// Construct the function that extracts the users
const resultQuery = compose(
  sortByNameReversed,
  usersWithLanguage("golang"),
  fullTimers,
  in30sUsers
);

const filteredUsers = resultQuery(usersFromApi);

//
// ~~~NEW STUFF FOLLOWS~~
//

// Format output to looks like: {all: [], byId: {}}
const extractUserId = prop("id");
const uniqueUserIds = compose(uniq, map(extractUserId));
const userById = indexBy(extractUserId);

const response = {
  all: uniqueUserIds(filteredUsers),
  byId: userById(filteredUsers)
};
console.log(JSON.stringify(response));
