import boto3

# find role by partial name
def getRole():
    iam = boto3.client('iam')
    response = iam.list_roles()
    roles = response['Roles']
    for role in roles:
        if 'sagemaker-immersion-day-SageMakerExecutionRole-' in role['RoleName']:
            return role

role = getRole()
print("Found sagemaker role: " + role['RoleName'])

# add the ec2 full access managed policy to the role
print("Granting ec2 full access to role")
iam = boto3.client('iam')
response = iam.attach_role_policy(
    RoleName=role['RoleName'],
    PolicyArn='arn:aws:iam::aws:policy/AmazonEC2FullAccess'
    )
print(response)

# add the secrets manager read only to the role
print("Granting secrets manager read only to role")
response = iam.attach_role_policy(
    RoleName=role['RoleName'],
    PolicyArn='arn:aws:iam::aws:policy/SecretsManagerReadWriteInfo'
    )
print(response)

