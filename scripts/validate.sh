#!/bin/bash
# @autor: Ian ÁT
# @comment:~
# @description: Script que valida si tenemos instalados: git, node, npm, curl
# Crear un script utilizando el comando command -v verifique si tengo instalado o no tengo instalado los paquetes: git, node, npm, curl.
# Si alguno de dichos paquetes no está en el sistema, mostraremos mensaje de error.

 clear
 echo "verificando los requisitos previos"

 if command -v node > /dev/null 2>&1;then
   NODE_VERSION=$(node --version)
   echo ":) Node instalado correctamente; version: $NODE_VERSION"
 else
   echo ":( No tienes instalado NodeJS"
   exit 1
 fi


 if command -v git ;then
   GIT_VERSION=$(git --version)
   echo ":) Git instalado correctamente; version: $GIT_VERSION"
 else
   echo ":( No tienes instalado Git"
   exit 1
 fi


 if command -v npm ;then
   NPM_VERSION=$(npm --version)
   echo ":) Npm instalado correctamente; version: $NPM_VERSION"
 else
   echo ":( No tienes instalado Npm"
   exit 1
 fi


 if command -v curl ;then
   CURL_VERSION=$(curl --version)
   echo ":) Curl instalado correctamente;"
 else
   echo ":( No tienes instalado Curl"
   exit 1
 fi

echo "Todos los paquetes instalados correctos"
