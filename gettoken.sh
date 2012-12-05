#!/bin/sh

curl -s -F "client_id=${1}" -F "client_secret=${2}" -F "grant_type=authorization_code" -F "redirect_uri=${3}" -F "code=${4}" https://api.instagram.com/oauth/access_token | sed -e 's/.*"access_token":"\([0-9a-zA-Z\.]*\)",.*/\1/'