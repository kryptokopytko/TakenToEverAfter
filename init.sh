#!/bin/bash

set -e

# Create PostgreSQL user and database.

export $(grep -v '^#' .env | xargs)
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
