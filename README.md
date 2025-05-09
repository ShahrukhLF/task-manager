# Task Manager with Docker

## Description
A microservices task manager with Node.js frontend and PostgreSQL backend.

## How to Run
```bash
docker network create app-network
docker run -d --name db-container --network app-network -v db-data:/var/lib/postgresql/data -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=tasks yourdockerhubusername/task-manager-db:v1
docker run -d --name web-container --network app-network -p 3000:3000 yourdockerhubusername/task-manager-web:v1