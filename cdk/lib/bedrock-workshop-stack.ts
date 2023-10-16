import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as sagemaker from 'aws-cdk-lib/aws-sagemaker';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BedrockWorkshopStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const defaultVpc = ec2.Vpc.fromLookup(this, 'DefaultVPC', { isDefault: true });

    const securityGroup = new ec2.SecurityGroup(this, 'RDSSecurityGroup', {
      vpc: defaultVpc,
      securityGroupName: "Bedrock-Workshop-RDS-SG"
    })

    const instance = new rds.DatabaseInstance(this, 'Instance', {
      engine: rds.DatabaseInstanceEngine.POSTGRES,
      // optional, defaults to m5.large
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.SMALL),
      credentials: rds.Credentials.fromGeneratedSecret('bedrock'), // Optional - will default to 'admin' username and generated password
      vpc: defaultVpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      securityGroups: [securityGroup],
    });

      

  }
}
