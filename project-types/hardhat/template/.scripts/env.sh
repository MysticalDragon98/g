if [ -z "$1" ]; then
  echo "Usage: yarn switch-env <env>"
  exit 1
fi

ts-node ignition/environments/index.ts $1
echo "Successfully switched to $1 environment"