# angular-mysql-php

## Description

A starter project for using AngularJS with Jade and Gulp to manipulate MySQL databases via a PHP RESTful API.

## Installation

To install front-end dependencies, run the following command:

```Shell
path/to/your/installation$ bower install
```

To install back-end dependencies (mainly for Gulp), run the following command:

```Shell
path/to/your/installation$ sudo npm install
```

Then create a MySQL database using the platform of your choice (e.g., by going to phpMyAdmin on your local or remote server) named "classicmodels."

After that, import _classicmodels.sql_ (located in the root directory of the project in an archive) into your new "classicmodels" database.

Finally, be sure to edit accordingly the relevant database constants in _api.php_ (located in the services directory). It looks like this by default:

```PHP
const DB_SERVER = "localhost";
const DB_USER = "root";
const DB_PASSWORD = "";
const DB = "classicmodels";
```

That should work for many local installations. Some tweaking may be required to get it to work on your own.

## Troubleshooting

Until some actual error handling is implemented, it is possible to troubleshoot MySQL errors (inability to connect to the database, etc.) by logging what is returned to a controller. For example:

```JavaScript
$scope.clients = data.data;
console.log($scope.clients);
```

This will effectively output any PHP _mysqli_ errors.
