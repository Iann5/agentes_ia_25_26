# Documento sobre el comando CURL

## Sinopsis
> curl [opciones/URL]

## Descripción

CURL es una herramienta para transferir datos desde o hacia un servidor mediante URL. Admite los siguientes protocolos:
```
DICT, FILE, FTP, FTPS, GOPHER, GOPHERS, HTTP, HTTPS, IMAP, IMAPS, LDAP, LDAPS, MQTT, POP3, POP3S, RTMP, RTMPS, RTSP, SCP, SFTP, SMB, SMBS, SMTP, SMTPS, TELNET, TFTP, WS y WSS.
```

(Se usa *libcurl* para todas las funciones de transferencia).

### URL

La sintaxis de la URL depende del protocolo.

Si se genera una URL sin un esquema inicial de protocolo: *"protocol://"* Este adivina el protocolo deseado. Generalmente usa HTTP, pero puede usar otros según los prefijos de nombre de host más comunes.

Estas puedes especificar cualquier URL. Se obtienen en el orden especificado a no ser que use **--parallel**

CURL no requiere de múltiples conexiones ya que intenta reutilizarlas y esto mejora la velocidad. 

Proporcione un ID de zona IPv6 en la URL con un signo de porcentaje de escape.
>"http://[fe80::3%25eth0]/"

### Globbing

Puedes especificar varias URL o partes de ellas escribiendo listas entre llaves o rangos entre corchetes. A esto le llamamos "globbing".

Al usar secuencias [ ] o { } en la línea de comandos, probablemente se tenga que escribir la URL completa entre comillas dobles para evitar que el shell interfiera. Esto también va para caracteres especiales, como:
>  -> "&", "?" y "*".

Desactive el globbing con --globoff .

#### -Ejemplo:

Realiza secuencias de series alfanuméricas utilizando [ ] como en:
> "ftp://ftp.ejemplo.com/archivo[1-100].txt"

### Variables

las variables se establecen con:
```
> --variable name=content 
            O
> --variable name@file
```

Estas variables de pueden expandir con *"--expand-"*, pero antes debemos importar las variables.

#### Mini explicación y ejemplo
```
El comando "--variable %name" importa la variable "name", pero genera un error si dicha variable no está configurada.
```

Ejemplo: Obtener la variable de entorno USER en la URL. Falla si no se configura.

> --variable '%USUARIO'
> --expand-url = "https://ejemplo.com/api/{{USUARIO}}/método"

### Producción

Por defecto, curl escribe los datos recibidos en la salida estándar y a parte, no analiza el contenido que obtiene o escribe como salida. Se le puede indicar que guarde esos datos en un archivo local mediante las opciones *--output* o *--remote-name*.

```
> --output => indicas el nombre del archivo.
> --remote-name => se guarda usando el nombre original del recurso.
```

## Protocolos

- DICT => Buscar palabras en diccionarios en línea.

- FILE => Leer o escribir archivos locales (file://).

- FTP(S) => Transferencia de archivos, con o sin TLS.

- GOPHER(S) => Recuperar archivos.

- HTTP(S) => Compatible con HTTP 0.9, 1.0, 1.1, 2 y 3 

- IMAP(S) => Descarga correos automáticamente, con o sin TLS.

- LDAP(S) => Búsquedas en directorios, con o sin TLS.

- MQTT => Soporta versión 3 y TLS no es compatible (Suscribirse equivale a un tema. Y publicar/subir equivale a publicar un tema)

- POP3(S) => Descarga correos desde POP3, con o sin TLS.

- RTMP(S) => Protocolo de mensajería en tiempo real.

- RTSP => Descargas con RTSP 1.0.

- SCP => Transferencias vía SSH v2.

- SFTP => Transferencias vía SSH v2.

- SMB(S) => SMB versión 1 para carga y descarga.

- SMTP(S) => Enviar correos a servidores SMTP, con o sin TLS.

- TELNET => Sesiones interactivas.

- TFTP => Descargas y cargas TFTP.

- WS(S) => WebSockets vía HTTP/1, WSS vía HTTPS.

## Opciones

Las opciones empiezan con uno o dos guiones. Muchas requieren un valor adicional. Si el texto proporcionado no empieza con un guión, se presupone que es una URL y se trata como tal.

### Solo un guión
```
> Esta puede usarse con o sin espacio entre ella y su valor
> Las opciones que no necesitan valores adicionales se pueden usar inmediatamente una al lado de la otra. Ej:
        -> -O -L -v == -OLv         
```

### Dos guiones
```
> Esta requiere el uso del espacio entre ella y su valor      
```

Las opciones booleanas se habilitan con --option y se deshabilitan con --no - option.

Al usar --next , se restablece el estado del analizador y se reinicia con un estado de opciones limpio, excepto las opciones globales. (Estas conservan sus valores)

### Opciones Globales

```
--fail-early          |  --libcurl
--parallel-immediate  | --parallel-max-host
--parallel-max        |  --parallel
--progress-bar        |  --rate
--show-error          |  --stderr
--styled-output       |  --trace-ascii
--trace-config        |  --trace-ids
--trace-time          |  --trace
--verbose             |
 ```

## Todas las opciones

| Opción | Explicación |
|--------|-------------|
| `--abstract-unix-socket` | Conecta usando un socket Unix abstracto en lugar de TCP/IP. |
| `--alt-svc` | Habilita el uso de un archivo de **Alternate Services (Alt-Svc)** para mejorar conexiones HTTP. |
| `--anyauth` | Deja que curl elija automáticamente el método de autenticación soportado por el servidor. |
| `-a, --append` | En cargas con FTP/SFTP, añade datos al archivo en lugar de sobrescribirlo. |
| `--aws-sigv4` | Usa el esquema de autenticación **AWS Signature v4** (para APIs de Amazon Web Services). |
| `--basic` | Fuerza la autenticación HTTP **Basic**. |
| `--ca-native` | Usa el almacén de certificados nativo del sistema operativo. |
| `--cacert <file>` | Especifica un archivo de certificados CA alternativo para verificar el servidor. |
| `--capath <dir>` | Directorio que contiene certificados CA confiables. |
| `-E, --cert <certificate[:password]>` | Especifica un certificado de cliente para autenticación SSL/TLS. |
| `--cert-status` | Solicita y verifica el estado del certificado (OCSP stapling). |
| `--cert-type <type>` | Tipo de certificado de cliente: por ejemplo `PEM` o `DER`. |
| `--ciphers <list>` | Lista de cifrados SSL/TLS a usar en la conexión. |
| `--compressed` | Solicita al servidor contenido comprimido (gzip, deflate). |
| `--compressed-ssh` | Habilita compresión en conexiones SSH/SFTP. |
| `-K, --config <file>` | Carga opciones desde un archivo de configuración. |
| `--connect-timeout <seconds>` | Tiempo máximo para establecer la conexión inicial. |
| `--connect-to <HOST1:PORT1:HOST2:PORT2>` | Redirige una conexión a un host/puerto diferente. |
| `-C, --continue-at <offset>` | Reanuda una descarga en el punto especificado. |
| `-b, --cookie <data|filename>` | Envía cookies al servidor desde un string o archivo. |
| `-c, --cookie-jar <filename>` | Guarda las cookies recibidas en un archivo. |
| `--create-dirs` | Crea directorios locales necesarios al guardar archivos. |
| `--create-file-mode <mode>` | Establece permisos para los archivos creados. |
| `--crlf` | Convierte saltos de línea en `CRLF` al subir datos (Windows-style). |
| `--crlfile <file>` | Especifica un archivo de lista de revocación de certificados (CRL). |
| `--curves <list>` | Define curvas de cifrado TLS específicas para ECDH. |
| `-d, --data <data>` | Envía datos en una petición HTTP POST. |
| `--data-ascii <data>` | Envía datos como ASCII sin codificación extra. |
| `--data-binary <data>` | Envía datos binarios sin modificar. |
| `--data-raw <data>` | Envía datos exactamente como se pasan, sin procesar. |
| `--data-urlencode <data>` | Envía datos codificados en URL en un POST. |
| `--delegation <LEVEL>` | Establece el nivel de delegación para GSS/Negotiate. |
| `--digest` | Habilita autenticación Digest. |
| `-q, --disable` | Desactiva la lectura de `.curlrc`. |
| `--disable-eprt` | Desactiva el comando FTP EPRT. |
| `--disable-epsv` | Desactiva el comando FTP EPSV. |
| `--disallow-username-in-url` | Prohíbe usuarios en la URL. |
| `--dns-interface <interface>` | Usa la interfaz especificada para consultas DNS. |
| `--dns-ipv4-addr <address>` | Especifica una dirección IPv4 local para DNS. |
| `--dns-ipv6-addr <address>` | Especifica una dirección IPv6 local para DNS. |
| `--dns-servers <addresses>` | Define servidores DNS específicos. |
| `--doh-cert-status` | Habilita verificación de estado de certificado en DoH. |
| `--doh-insecure` | Ignora errores de certificado en DoH. |
| `--doh-url <URL>` | Establece la URL del servidor DNS sobre HTTPS. |
| `--dump-ca-embed` | Muestra certificados CA incrustados en curl. |
| `-D, --dump-header <filename>` | Guarda cabeceras de respuesta en un archivo. |
| `--ech <config>` | Configuración para Encrypted ClientHello (TLS). |
| `--egd-file <file>` | Archivo para obtener aleatoriedad. |
| `--engine <name>` | Especifica motor de cifrado SSL. |
| `--etag-compare <file>` | Compara ETag para ver si hay cambios. |
| `--etag-save <file>` | Guarda ETag para comparaciones futuras. |
| `--expect100-timeout <seconds>` | Timeout para respuesta 100-continue. |
| `-f, --fail` | Fallar silenciosamente en HTTP >= 400. |
| `--fail-early` | Termina inmediatamente en fallo HTTP. |
| `--fail-with-body` | Muestra el cuerpo incluso en fallo HTTP. |
| `--false-start` | Habilita TLS False Start. |
| `--follow` | Sigue redirecciones automáticamente. |
| `-F, --form <name=content>` | Envía datos de formulario multipart. |
| `--form-escape` | Escapa caracteres en datos de formulario. |
| `--ftp-account <data>` | Envía datos de cuenta FTP después del login. |
| `--ftp-alternative-to-user <command>` | Comando alternativo a USER en FTP. |
| `--ftp-create-dirs` | Crea directorios necesarios en FTP. |
| `--ftp-method <method>` | Método de transferencia FTP. |
| `--ftp-pasv` | Activa FTP pasivo. |
| `-P, --ftp-port <address>` | Activa FTP activo usando esta dirección. |
| `--ftp-pret` | Habilita el comando PRET en FTP. |
| `--ftp-skip-pasv-ip` | Ignora IP de PASV en FTP. |
| `--ftp-ssl-ccc` | Cambia de SSL a no-SSL después de login FTP. |
| `--ftp-ssl-ccc-mode <active/passive>` | Modo CCC FTP. |
| `--ftp-ssl-control` | Habilita SSL para el canal de control FTP. |
| `-G, --get` | Convierte datos en parámetros GET. |
| `-g, --globoff` | Desactiva expansión de llaves y corchetes en URL. |
| `--happy-eyeballs-timeout-ms <ms>` | Timeout de conexión IPv4/IPv6. |
| `--haproxy-clientip <ip>` | Envia IP cliente al proxy HAProxy. |
| `--haproxy-protocol` | Activa protocolo HAProxy. |
| `-I, --head` | Solo solicita cabeceras HTTP. |
| `-H, --header <header/@file>` | Añade cabecera HTTP personalizada. |
| `-h, --help <subject>` | Muestra ayuda o tema específico. |
| `--hostpubmd5 <md5>` | Verifica clave pública del host por MD5. |
| `--hostpubsha256 <sha256>` | Verifica clave pública del host por SHA256. |
| `--hsts <filename>` | Archivo de HSTS. |
| `--http0.9` | Permite HTTP/0.9. |
| `-0, --http1.0` | Fuerza HTTP/1.0. |
| `--http1.1` | Fuerza HTTP/1.1. |
| `--http2` | Habilita HTTP/2. |
| `--http2-prior-knowledge` | HTTP/2 sin negociación ALPN. |
| `--http3` | Habilita HTTP/3. |
| `--http3-only` | Solo HTTP/3, sin fallback. |
| `--ignore-content-length` | Ignora la cabecera Content-Length. |
| `-k, --insecure` | Ignora errores de certificado SSL. |
| `--interface <name>` | Interfaz de red a usar. |
| `--ip-tos <string>` | Tipo de servicio IP (TOS). |
| `--ipfs-gateway <URL>` | Especifica gateway IPFS. |
| `-4, --ipv4` | Forzar IPv4. |
| `-6, --ipv6` | Forzar IPv6. |
| `--json <data>` | Enviar datos JSON en POST. |
| `-j, --junk-session-cookies` | Ignora cookies de sesión. |
| `--keepalive-cnt <integer>` | Número de probes TCP keepalive. |
| `--keepalive-time <seconds>` | Intervalo TCP keepalive. |
| `--key <key>` | Clave privada SSL. |
| `--key-type <type>` | Tipo de clave privada SSL. |
| `--krb <level>` | Nivel de autenticación Kerberos. |
| `--libcurl <file>` | Muestra información de compilación libcurl. |
| `--limit-rate <speed>` | Limita velocidad de transferencia. |
| `-l, --list-only` | Lista solo archivos FTP. |
| `--local-port <range>` | Puerto local para conexión. |
| `-L, --location` | Seguir redirecciones HTTP. |
| `--location-trusted` | Seguir redirecciones con credenciales. |
| `--login-options <options>` | Opciones para login SASL/FTP. |
| `--mail-auth <address>` | Autenticación de correo SMTP. |
| `--mail-from <address>` | Remitente en SMTP. |
| `--mail-rcpt <address>` | Destinatario en SMTP. |
| `--mail-rcpt-allowfails` | Ignora errores de destinatario SMTP. |
| `-M, --manual` | Muestra el manual de curl. |
| `--max-filesize <bytes>` | Tamaño máximo de descarga. |
| `--max-redirs <num>` | Número máximo de redirecciones. |
| `-m, --max-time <seconds>` | Timeout total de la operación. |
| `--metalink` | Soporta Metalink. |
| `--mptcp` | Habilita MPTCP si disponible. |
| `--negotiate` | Habilita autenticación Negotiate (SPNEGO). |
| `-n, --netrc` | Usa credenciales del archivo `.netrc`. |
| `--netrc-file <filename>` | Archivo `.netrc` alternativo. |
| `--netrc-optional` | Usa `.netrc` si existe. |
| `-:, --next` | Inicia una nueva operación HTTP. |
| `--no-alpn` | Desactiva ALPN en TLS. |
| `-N, --no-buffer` | Desactiva buffering de salida. |
| `--no-clobber` | No sobrescribe archivos locales. |
| `--no-keepalive` | Desactiva TCP keepalive. |
| `--no-npn` | Desactiva NPN en TLS. |
| `--no-progress-meter` | Oculta barra de progreso. |
| `--no-sessionid` | No usa sesión SSL. |
| `--noproxy <no-proxy-list>` | Lista de hosts sin proxy. |
| `--ntlm` | Habilita autenticación NTLM. |
| `--ntlm-wb` | NTLM con Workstation/Browser. |
| `--oauth2-bearer <token>` | Token OAuth2 para autenticación. |
| `--out-null` | Descarta la salida. |
| `-o, --output <file>` | Guarda salida en archivo. |
| `--output-dir <dir>` | Directorio para archivos descargados. |
| `-Z, --parallel` | Descarga en paralelo. |
| `--parallel-immediate` | Inicia todas las descargas paralelas de inmediato. |
| `--parallel-max <num>` | Número máximo de descargas paralelas. |
| `--parallel-max-host <num>` | Máximo por host. |
| `--pass <phrase>` | Passphrase para clave privada SSL. |
| `--path-as-is` | No modifica el path de URL. |
| `--pinnedpubkey <hashes>` | Claves públicas fijas para verificación. |
| `--post301` | Reenvía POST tras redirección 301. |
| `--post302` | Reenvía POST tras redirección 302. |
| `--post303` | Reenvía POST tras redirección 303. |
| `--preproxy <[protocol://]host[:port]>` | Proxy previo para la conexión. |
| `-#, --progress-bar` | Muestra barra de progreso. |
| `--proto <protocols>` | Protocolos permitidos. |
| `--proto-default <protocol>` | Protocolo por defecto. |
| `--proto-redir <protocols>` | Protocolos permitidos en redirecciones. |
| `-x, --proxy <[protocol://]host[:port]>` | Usa proxy especificado. |
| `--proxy-anyauth` | Auto-selecciona método de proxy. |
| `--proxy-basic` | Autenticación básica proxy. |
| `--proxy-ca-native` | Usa CA del sistema para proxy SSL. |
| `--proxy-cacert <file>` | Certificado CA para proxy. |
| `--proxy-capath <dir>` | Carpeta de certificados para proxy. |
| `--proxy-cert <cert[:passwd]>` | Certificado cliente para proxy. |
| `--proxy-cert-type <type>` | Tipo de certificado cliente proxy. |
| `--proxy-ciphers <list>` | Cifras TLS para proxy. |
| `--proxy-crlfile <file>` | Lista de revocación para proxy. |
| `--proxy-digest` | Habilita autenticación Digest proxy. |
| `--proxy-header <header/@file>` | Añade cabecera al proxy. |
| `--proxy-http2` | Habilita HTTP/2 hacia proxy. |
| `--proxy-insecure` | Ignora errores SSL proxy. |
| `--proxy-key <key>` | Clave privada proxy. |
| `--proxy-key-type <type>` | Tipo de clave privada proxy. |
| `--proxy-negotiate` | Habilita autenticación Negotiate proxy. |
| `--proxy-ntlm` | Habilita NTLM proxy. |
| `--proxy-pass <phrase>` | Passphrase proxy. |
| `--proxy-pinnedpubkey <hashes>` | Clave pública fija proxy. |
| `--proxy-service-name <name>` | Nombre de servicio para proxy. |
| `--proxy-ssl-allow-beast` | Permite ataque BEAST en proxy SSL. |
| `--proxy-ssl-auto-client-cert` | Envía certificado automáticamente. |
| `--proxy-tls13-ciphers <list>` | Cifras TLS1.3 proxy. |
| `--proxy-tlsauthtype <type>` | Tipo de autenticación TLS proxy. |
| `--proxy-tlspassword <string>` | Contraseña TLS proxy. |
| `--proxy-tlsuser <name>` | Usuario TLS proxy. |
| `--proxy-tlsv1` | Usa TLSv1 proxy. |
| `-U, --proxy-user <user:password>` | Usuario y contraseña proxy. |
| `--proxy1.0 <host[:port]>` | Proxy HTTP/1.0. |
| `-p, --proxytunnel` | Tunnel a través de proxy. |
| `--pubkey <key>` | Clave pública TLS. |
| `-Q, --quote <command>` | Comando FTP antes de transferir. |
| `--random-file <file>` | Archivo de aleatoriedad. |
| `-r, --range <range>` | Descarga parcial de archivo. |
| `--rate <max request rate>` | Limita la tasa de solicitudes. |
| `--raw` | Desactiva codificación de transferencia. |
| `-e, --referer <URL>` | Cabecera Referer. |
| `-J, --remote-header-name` | Usa nombre del archivo remoto. |
| `-O, --remote-name` | Guarda con nombre remoto. |
| `--remote-name-all` | Guarda todos los archivos con nombre remoto. |
| `-R, --remote-time` | Conserva fecha del archivo remoto. |
| `--remove-on-error` | Borra archivo si hay error. |
| `-X, --request <method>` | Fuerza un método HTTP. |
| `--request-target <path>` | Modifica el path del request. |
| `--resolve <[+]host:port:addr[,addr]...>` | Resuelve host a IP específica. |
| `--retry <num>` | Número de reintentos. |
| `--retry-all-errors` | Reintenta todos los errores. |
| `--retry-connrefused` | Reintenta si conexión es rechazada. |
| `--retry-delay <seconds>` | Delay entre reintentos. |
| `--retry-max-time <seconds>` | Tiempo máximo de reintentos. |
| `--sasl-authzid <identity>` | Identidad SASL. |
| `--sasl-ir` | Inicializa SASL inmediatamente. |
| `--service-name <name>` | Nombre de servicio para autenticación. |
| `-S, --show-error` | Muestra errores incluso con `-s`. |
| `-i, --show-headers` | Muestra cabeceras de respuesta. |
| `--sigalgs <list>` | Algoritmos de firma TLS. |
| `-s, --silent` | Modo silencioso. |
| `--skip-existing` | Salta archivos existentes. |
| `--socks4 <host[:port]>` | Usa proxy SOCKS4. |
| `--socks4a <host[:port]>` | Usa proxy SOCKS4a. |
| `--socks5 <host[:port]>` | Usa proxy SOCKS5. |
| `--socks5-basic` | Autenticación básica SOCKS5. |
| `--socks5-gssapi` | Autenticación GSSAPI SOCKS5. |
| `--socks5-gssapi-nec` | Compatibilidad NEC para GSSAPI. |
| `--socks5-gssapi-service <name>` | Servicio GSSAPI para SOCKS5. |
| `--socks5-hostname <host[:port]>` | Resolución de nombre en SOCKS5. |
| `-Y, --speed-limit <speed>` | Límite de velocidad para desconexión. |
| `-y, --speed-time <seconds>` | Tiempo de velocidad mínima. |
| `--ssl` | Fuerza SSL/TLS. |
| `--ssl-allow-beast` | Permite ataque BEAST SSL. |
| `--ssl-auto-client-cert` | Envía certificado cliente automáticamente. |
| `--ssl-no-revoke` | No verifica revocación de certificados. |
| `--ssl-reqd` | Requiere SSL/TLS. |
| `--ssl-revoke-best-effort` | Verifica revocación si posible. |
| `--ssl-sessions <filename>` | Archivo de sesiones SSL. |
| `-2, --sslv2` | Fuerza SSLv2. |
| `-3, --sslv3` | Fuerza SSLv3. |
| `--stderr <file>` | Redirige stderr a archivo. |
| `--styled-output` | Salida con estilo (color, formato). |
| `--suppress-connect-headers` | Oculta cabeceras de conexión. |
| `--tcp-fastopen` | Habilita TCP Fast Open. |
| `--tcp-nodelay` | Desactiva Nagle. |
| `-t, --telnet-option <opt=val>` | Configura opciones Telnet. |
| `--tftp-blksize <value>` | Tamaño bloque TFTP. |
| `--tftp-no-options` | Ignora opciones TFTP. |
| `-z, --time-cond <time>` | Descarga solo si más reciente que fecha. |
| `--tls-earlydata` | Envía datos TLS early. |
| `--tls-max <VERSION>` | Versión TLS máxima. |
| `--tls13-ciphers <list>` | Cifras TLS1.3. |
| `--tlsauthtype <type>` | Tipo de autenticación TLS. |
| `--tlspassword <string>` | Contraseña TLS. |
| `--tlsuser <name>` | Usuario TLS. |
| `-1, --tlsv1` | Fuerza TLSv1. |
| `--tlsv1.0` | Fuerza TLSv1.0. |
| `--tlsv1.1` | Fuerza TLSv1.1. |
| `--tlsv1.2` | Fuerza TLSv1.2. |
| `--tlsv1.3` | Fuerza TLSv1.3. |
| `--tr-encoding` | Decodifica transfer-encoding automáticamente. |
| `--trace <file>` | Guarda trace de comunicación. |
| `--trace-ascii <file>` | Trace en ASCII. |
| `--trace-config <string>` | Configura trace de libcurl. |
| `--trace-ids` | Incluye IDs en trace. |
| `--trace-time` | Añade timestamp al trace. |
| `--unix-socket <path>` | Conecta usando socket Unix. |
| `-T, --upload-file <file>` | Subir archivo. |
| `--upload-flags <flags>` | Flags para subida de archivos. |
| `--url <url/file>` | URL a procesar. |
| `--url-query <data>` | Datos de querystring. |
| `-B, --use-ascii` | Usa modo ASCII FTP. |
| `-u, --user <user:password>` | Usuario y contraseña. |
| `-A, --user-agent <name>` | Cabecera User-Agent. |
| `--variable <[%]name=text/@file>` | Define variable para templates. |
| `-v, --verbose` | Modo verbose. |
| `-V, --version` | Muestra versión de curl. |
| `--vlan-priority <priority>` | Prioridad VLAN. |
| `-w, --write-out <format>` | Formato de salida adicional. |
| `--xattr` | Guarda atributos extendidos de archivo. |
