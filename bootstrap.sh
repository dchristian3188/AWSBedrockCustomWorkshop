#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

python3 $SCRIPT_DIR/grantNotebookpermissions.py
pushd ./cdk
npm install
cdk bootstrap 
cdk deploy --require-approval never