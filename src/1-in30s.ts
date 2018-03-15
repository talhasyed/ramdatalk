import { filter } from "ramda";

const usersFromApi = require("./users.json");

// 30s
const is30Plus = ({ age }) => age >= 30; // predicate function
// const is30Plus = user => user.age >= 30;
const in30sUsers = filter(is30Plus);

// Construct the function that extracts the users
const resultQuery = in30sUsers;

const filteredUsers = resultQuery(usersFromApi);
console.log(JSON.stringify(filteredUsers));
