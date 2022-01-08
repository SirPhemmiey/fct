### Dependencies

- Node
- Yarn

## How to run locally?

- First create .env.development file in the root directory and put the following content in it

```
PORT=11700
NODE_ENV=development
CACHE_CAPACITY=2
MONGO_URI=mongodb://localhost:27017/fashion-cloud-dev

```

You can also create another .env.testing for testing and copy this content inside it

```
PORT=11701
NODE_ENV=testing
CACHE_CAPACITY=2
MONGO_URI=mongodb://localhost:27017/fashion-cloud-test

```

- Run the following to start

```
yarn install
yarn start

```

## How to test? 

`yarn test`

### Patterns and Principles used in the project

```
https://github.com/SirPhemmiey/fct/blob/master/IDEAS.md
```