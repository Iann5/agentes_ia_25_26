#!/bin/bash

# Descripción: hazer las operaciones CRUD con curl

BASE_URL="http://localhost:3000/books"

echo "Iniciando operaciones CRUD en: $BASE_URL"
echo "-------------------------------------------"

# READ: Obtener todos los libros
echo "GET - Listar todos los libros"
curl -s -X GET "$BASE_URL" | jq .
echo "-------------------------------------------"

# CREATE: Crear un nuevo libro
echo "POST - Crear un nuevo libro"
curl -s -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Pragmatic Programmer",
    "authorId": 2,
    "year": 1999,
    "topic": "Programming Best Practices",
    "language": "General"
  }' | jq .
echo "-------------------------------------------"

# UPDATE: Actualizar un libro existente (id = 1)
echo "PUT - Actualizar libro con ID 1"
curl -s -X PUT "$BASE_URL/1" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Clean Code (Updated)",
    "authorId": 1,
    "year": 2008,
    "topic": "Software Design",
    "language": "Java"
  }' | jq .
echo "-------------------------------------------"

# DELETE: Eliminar un libro (id = 2)
echo "DELETE - Eliminar libro con ID 2"
curl -s -X DELETE "$BASE_URL/2"
echo
echo "-------------------------------------------"

echo "CRUD completado"
