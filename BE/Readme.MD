## Required
- [Node.js] (Ensure that Node.js is installed on your system)
- [npm] (Node package manager, usually comes with Node.js)

## Tech
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework 

## Installation


```sh
npm install
```

Running The Server....

```sh
npm start
```

## Endpoint

This server uses the REST API model as its endpoint
The server will be up and running on the specified port (by default, it runs on http://localhost:8080). You can configure the port in the .env file.

| Endpoint | function |
| ------ | ------ |
| GET /api/resource| Fetches all resources. |
| GET /api/resource/:id | Fetches a single resource by ID. |
| POST /api/resource| Creates a new resource.|
|PUT /api/resource/:id | Updates an existing resource by ID.|
| DELETE /api/resource/:id | Deletes a resource by ID.|


## Environment Variables



```sh
DB_USER=
DB_HOST=
DB_NAME=
DB_PORT=
DB_PASSWORD=
PORT=
```


