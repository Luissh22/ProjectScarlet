#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import {UserPoolStack} from "../lib/user_pool_stack";
import {appName} from "../lib/constants";

const app = new cdk.App();
const envCA = {
    account: "042748443858",
    region: "ca-central-1"
}
new UserPoolStack(app, `${appName}UserPoolStack`, {
    env: envCA
});
