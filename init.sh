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
sudo -u postgres psql -d postgres -f init.sql
rm init.sql

cd backend

# Create virtual environment

pip3 install pipenv
pipenv shell
pipenv install django
pip3 install python-dotenv

# Create DJANGO apps.

APPS=("accounts" "expenses" "guests" "photos" "preferences" "questionnaire" "seating" "tasks")

for APP in "${APPS[@]}"
do
  python3 manage.py makemigrations $APP
  python3 manage.py migrate $APP
done
