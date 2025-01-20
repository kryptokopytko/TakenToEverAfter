#!/bin/bash

set -e


export $(grep -v '^#' .env | xargs)

# Generate DJANGO secret key.

if [ -z "$DJANGO_SECRET_KEY" ]; then
  export DJANGO_SECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_urlsafe(50))')
  echo "DJANGO_SECRET_KEY=$DJANGO_SECRET_KEY" >> .env
fi

# Create PostgreSQL user and database.

envsubst < init.sql.template > init.sql
psql -U postgres -f init.sql
rm init.sql

# Create DJANGO apps.

APPS=("accounts" "expenses" "guests" "photos" "preferences" "questionnaire" "seating" "tasks")

cd backend

for APP in "${APPS[@]}"
do
  python3 manage.py makemigrations $APP
  python3 manage.py migrate $APP
done
