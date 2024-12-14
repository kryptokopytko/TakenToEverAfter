#!/bin/bash

set -e

APPS=("accounts" "expenses" "guests" "photos" "preferences" "questionnaire" "seating" "tasks")

cd backend

for APP in "${APPS[@]}"
do
  python3 manage.py makemigrations $APP
  python3 manage.py migrate $APP
done
