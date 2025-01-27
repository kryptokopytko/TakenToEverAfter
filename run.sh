#!/bin/bash

concurrently --handle-input \
  -n "FRONTEND, BACKEND" \
  --prefix-colors "bgBlue.bold,bgGreen.bold" \
  "cd frontend && npm install && npm run dev" \
  "sleep 5 && cd backend && python3 manage.py makemigrations && python3 manage.py migrate && python3 manage.py runserver" 
