FROM postgres:15
ENV POSTGRES_DB=tasks
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=secret
COPY init.sql /docker-entrypoint-initdb.d/