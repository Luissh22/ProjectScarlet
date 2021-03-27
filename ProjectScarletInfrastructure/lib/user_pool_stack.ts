import * as cdk from '@aws-cdk/core';
import { UserPool } from '@aws-cdk/aws-cognito';
import {appName} from "./constants";

export interface UserPoolStackProps extends cdk.StackProps {
}

export class UserPoolStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: UserPoolStackProps) {
        super(scope, id, props);

        const userPoolName = `${appName}UserPool`

        const userPool = new UserPool(this, userPoolName, {
            userPoolName: userPoolName,
            selfSignUpEnabled: true,
            userVerification:  {
                smsMessage: "Hello {username}, Thanks for signing up to Project Scarlet! Your verification code is {####}"
            },
            signInAliases: {
              username: true,
            },
            standardAttributes: {
                email: {
                    required: true,
                    mutable: false
                },
                phoneNumber: {
                    required: true,
                    mutable: false
                },
                birthdate: {
                    required: true,
                    mutable: false
                },
                profilePicture: {
                    required: false,
                    mutable: true
                }
            },
            passwordPolicy: {
                minLength: 8
            }
        });

        this.addClient(userPool, "ios-app-client");
    }
    private addClient(userPool: UserPool, clientId: string) {
        userPool.addClient(clientId, {
            authFlows: {
                userPassword: true
            }
        });
    }
}

