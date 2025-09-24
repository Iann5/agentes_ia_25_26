#!/bin/bash
# @autor: Ian ÁT
# @comment:~
# @description: Crear /scripts/test.sh que lance toda los posibles test del comando curl para realizar
# GET, POST, DELETE, PATCH, PUT

# URL base (puedes cambiarla por tu API)

BASE_URL="http://localhost:3000"

echo "Probando GET..."
curl -X GET "$BASE_URL/items"
echo -e "\n"

echo "Probando POST..."
curl -X POST "$BASE_URL/items" \
     -H "Content-Type: application/json" \
     -d '{"name":"nuevo item"}'
echo -e "\n"

echo "Probando PUT..."
curl -X PUT "$BASE_URL/items/1" \
     -H "Content-Type: application/json" \
     -d '{"name":"item actualizado"}'
echo -e "\n"

echo "Probando PATCH..."
curl -X PATCH "$BASE_URL/items/1" \
     -H "Content-Type: application/json" \
     -d '{"name":"item parcialmente actualizado"}'
echo -e "\n"

echo "Probando DELETE..."
curl -X DELETE "$BASE_URL/items/1"
echo -e "\n"