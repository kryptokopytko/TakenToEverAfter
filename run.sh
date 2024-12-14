#!/bin/bash

concurrently --handle-input \
  -n "BACKEND,FRONTEND" \
  --prefix-colors "bgBlue.bold,bgGreen.bold" \
  "cd backend && python3 manage.py makemigrations && python3 manage.py migrate && python3 manage.py runserver" \
  "cd frontend && npm install && npm run dev"
