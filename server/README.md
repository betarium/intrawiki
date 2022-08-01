# express-generator to typescript sample

https://github.com/expressjs/generator

## Action

### 1.create project

```
npm install -g pnpm
pnpm install -g typescript

pnpx express-generator --git express-generator-to-typescript-sample

cd express-generator-to-typescript-sample

rem git init
rem git add .
rem git commit -m "create project"
```

### 2.init typescript

```
pnpm install typescript
pnpm tsc --init

pnpm install -D @types/node
pnpm install -D @types/express
pnpm install ts-node
pnpm install -D ts-node-dev
pnpm install tsconfig-paths

pnpm install

mkdir src
mkdir src\routes

move routes\index.js src\routes\index.ts
move routes\users.js src\routes\users.ts
move app.js src\app.ts
move bin\www src\main.ts

rmdir bin
rmdir routes

echo build/ >> .gitignore

rem git add .
rem git commit -m "init typescript"
```

### 3.edit config

Edit package.json.
```
  "scripts": {
    "start": "node ./build/main.js",
    "debug": "ts-node-dev -r tsconfig-paths/register ./src/main.ts",
    "build": "tsc"
  },
```

Edit tsconfig.json.
```
    "rootDir": "./src/",
    "baseUrl": "./src/",
    "outDir": "./build/",
```

### 4.edit source

Edit require to import.
* src/app.ts
* src/routes/index.ts
* src/routes/users.ts

```
//var express = require('express');
import express from 'express';
``` 

edit require path in src/main.ts.

```
//var app = require('../app');
var app = require('./app');
```

edit view setting in src/app.ts.
```
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));
```

### 5.build and start server

```
pnpm build && pnpm start
```

Open http://localhost:3000/ in browser.

## Command

```
pnpm start     # start express server in javascript.
pnpm debug     # start express server in typescript with development mode.
pnpm build     # build typescript.
```
