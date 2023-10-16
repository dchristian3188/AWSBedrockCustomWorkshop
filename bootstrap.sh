pushd ./cdk
python3 ./lib/grantNotebookPermissions.py
npm install
cdk bootstrap 
cdk deploy --require-approval never