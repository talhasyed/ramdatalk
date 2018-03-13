import {
  propSatisfies,
  filter,
  compose,
  equals,
  contains,
  merge,
  map,
  prop,
  indexBy,
  evolve,
  uniq,
  concat,
  pipe,
  complement,
  not
} from "ramda";

const usersFromApi = require("./users.json");

// 30s - TODO make it take an arbitrary age range
const is30Plus = ({ age }) => age >= 30;
// same as const isAbove30 = (user) => user.age > 30;
const in30sUsers = filter(is30Plus);

// fulltimers - TODO add non-fulltimers
const isPropTrue = prop => propSatisfies(equals(true), prop);
const isPropFalse = prop => complement(isPropTrue);
const isFullTime = isPropTrue("fulltime");
const isNotFulltime = isPropFalse("fulltime");
const fullTimers = filter(isFullTime);
const nonFulltimers = filter(isNotFulltime);

// languages - TODO make it take multiple languages
const knowsLanguage = language => contains(language);
const userKnowsLanguage = language =>
  propSatisfies(knowsLanguage(language), "languages");
const usersWithLanguage = language => filter(userKnowsLanguage(language));

const resultQuery = compose(
  // usersWithLanguage("golang"),
  fullTimers
  // in30sUsers
  // nonFulltimers
);

const filteredUsers = resultQuery(usersFromApi);
// console.log(JSON.stringify(filteredUsers));

// Format output to looks like: {all: [], byId: {}}
const extractUserId = prop("id");
const uniqueUserIds = compose(uniq, map(extractUserId));
const userById = indexBy(extractUserId);

const response = {
  all: uniqueUserIds(filteredUsers),
  byId: userById(filteredUsers)
};
console.log(JSON.stringify(response));

// http://randycoulman.com/blog/categories/thinking-in-ramda/
// https://alligator.io/react/functional-redux-reducers-with-ramda/
// TODO first go into high level benefits of functional: decl, testable
//  output of one is input to another, it's immutable
// TODO why compose is left to right// pause after first part
// TODO make it clear what a predicate is
// TODO show doc when first talking about specific functions
// TODO talk about transducers
