## What's Different?

The primary distinguishing features of Ramda are:

* **Purer functional style**. Immutability and side-effect free functions are at the heart of its design philosophy.
* Ramda functions are **automatically curried**. Allows you to easily build up new functions from old ones simply by not supplying the final parameters.
* Parameters to Ramda functions are arranged to make it convenient for currying. The **data to be operated on is generally supplied last**.
* The last two points together make it very easy to **build functions as sequences of simpler functions (compose), each of which transforms the data and passes it along to the next**.

### Currying

```javascript
const fullName = (lastName) => (firstName) => `${firstName} ${lastName}`

const withLastName = (lastName) => fullName(lastName);

const smithName = withLastName('Smith');
const syedName = withLastName('Syed')

console.log(
  smithName('John'),
  smithName('Jane'),
  syedName('Talha')
)
```
