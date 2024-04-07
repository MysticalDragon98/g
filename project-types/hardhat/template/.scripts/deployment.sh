if [ -z "$1" ]
  then
    echo "Usage: yarn deployment <module>"
    exit 1
fi

hardhat ignition visualize ignition/modules/$1.deployment.ts