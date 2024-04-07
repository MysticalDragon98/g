if [ -z "$1" ]
  then
    echo "Usage: yarn deploy <module>"
    exit 1
fi

ts-node ignition/environments/index.ts
hardhat ignition deploy ignition/modules/$1.deployment.ts --parameters ignition/parameters.json
npm run build:types