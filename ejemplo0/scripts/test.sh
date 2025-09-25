#!/bin/bash
# @autor: Ian ÁT
# @comment:~
# @description: Crear /scripts/test.sh que lance toda los posibles test del comando curl para realizar
# GET, POST, DELETE, PATCH, PUT

# URL base (puedes cambiarla por tu API)

set -u
local code
code=$(tail -n1 "$tmpfile" 2>/dev/null || true)
# curl solo escribe código en la salida estándar debido a la captura por sustitución de comandos (-w);
# Volveremos a ejecutar una solicitud silenciosa para obtener el código de forma fiable.
local http_code
http_code=$(curl -sS -o /dev/null -w "%{http_code}" -X "$method" "$url" ${data:+-d "$data"} 2>/dev/null || echo "000"){


echo "HTTP status: $http_code"
echo "Headers:"
sed -n '1,120p' "$headerfile" 2>/dev/null || echo "(no headers)"
echo "Body (primeros 800 chars):"
head -c 800 "$tmpfile" || true
echo "\n\n-- Formateado (si jq disponible):"
pretty_json < "$tmpfile" | sed -n '1,200p' || true
echo "\nSalida guardada: $tmpfile (headers: $headerfile)"
}


# 1) GET: listar posts
http_req GET "$BASE_URL/posts" "" "get_posts"


# 2) GET: post id=1
http_req GET "$BASE_URL/posts/1" "" "get_post_1"


# 3) GET: comentarios filtrados por postId=1
http_req GET "$BASE_URL/comments?postId=1" "" "get_comments_post1"


# 4) POST: crear recurso (simulado)
PAYLOAD_POST='{"title":"Hola desde Git Bash","body":"POST de prueba","userId":42}'
http_req POST "$BASE_URL/posts" "$PAYLOAD_POST" "post_create"


# 5) PUT: reemplazar recurso id=1
PAYLOAD_PUT='{"id":1,"title":"PUT - reemplazo total","body":"Contenido reemplazado","userId":1}'
http_req PUT "$BASE_URL/posts/1" "$PAYLOAD_PUT" "put_post_1"


# 6) PATCH: actualizar parcialmente id=1
PAYLOAD_PATCH='{"title":"PATCH - solo título"}'
http_req PATCH "$BASE_URL/posts/1" "$PAYLOAD_PATCH" "patch_post_1"


# 7) DELETE: borrar recurso id=1 (simulado)
http_req DELETE "$BASE_URL/posts/1" "" "delete_post_1"


# 8) Mostrar sólo códigos HTTP de ejemplo (GET + POST)
echo "\n==> Resumen rápido de códigos HTTP"
for e in "GET $BASE_URL/posts/1" "POST $BASE_URL/posts"; do
method=${e%% *}
url=${e#* }
code=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" "$url" ${method:0:4} == "POST" && echo "" || true)

# Le pregunta a curl por el código HTTP directamente
code=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" "$url" ${method:+-d "${PAYLOAD_POST}"} 2>/dev/null || echo "000")
echo "$method $url -> $code"
done

cat