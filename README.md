## NextJS - MySQL - CRUD

Proyecto con NextJS para aprender a hacer operaciones crud contra una base de datos MySQL.

Configuracion con ESLint, Tailwind, directorio src/ y App Router.

- Conexiones a BD MySQL con el modulo [serverless-mysql](https://www.npmjs.com/package/serverless-mysql):
- Consultas a la api con axios

```bash
npm i serverless-mysql
```

Consultas BD:
CREATE DATABASE nextjsmysqlcrud;
USE nextjsmysqlcrud;

CREATE TABLE product(
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(200) NOT NULL,
description VARCHAR(200),
price DECIMAL(10,2),
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
