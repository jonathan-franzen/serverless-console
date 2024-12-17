## Serverless Console

Simple lambda handler to run CLI commands, like database migrations, create admin user, etc...

### Installation

`yarn install serverless-console`

### Usage

Setup a console file, `src/console.ts`.

Initiate the handler

```
// src/console.ts

import { serverlessConsole } from 'serverless-console';

export const handler: (command: string) => Promise<void> = serverlessConsole;
```

Optionally define a set of commands that are allowed

```
// src/console.ts

import { consoleAllowList, serverlessConsole } from 'serverless-console';

consoleAllowList(['console.log("This command is allowed.")', 'yarn --version']);

export const handler: (command: string) => Promise<void> = serverlessConsole;
```

### Serverless example with CRON

```
// serverless.yml

custom:
  stage: ${opt:stage, "staging"}
  cronEnabled:
    staging: true
    prod: true

provider:
  name: aws
  runtime: nodejs20.x
  region: us-east-1
  stage: ${opt:stage, 'staging'}
  timeout: 20
 
functions:
  console:
    handler: src/console.handler
    events:
      - schedule:
          enabled: ${self:custom.cronEnabled.${self:custom.stage}}
          rate: rate(1 minute)
          input: 'yarn --version'
```
Invoke with `yarn serverless invoke --function console --data "yarn --version"`
