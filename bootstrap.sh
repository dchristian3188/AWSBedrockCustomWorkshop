python3 grantNotebookPermissions.py
pushd ./cdk
npm install
cdk bootstrap 
cdk deploy --require-approval never