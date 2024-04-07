MODULE=$1
CONTRACT=$2

if [ -n "$MODULE" ] && [ -n "$CONTRACT" ]; then
  echo "Running tests for module: $MODULE and contract: $CONTRACT"
  npx mocha --exit --recursive --require ts-node/register test/$MODULE/$CONTRACT.test.ts
  exit 0
fi

mocha --exit --recursive --require ts-node/register test/**/*.ts