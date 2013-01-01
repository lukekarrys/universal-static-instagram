#!/bin/sh

open "https://api.instagram.com/oauth/authorize/?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${1}&response_type=code"
echo "Enter your code"
read code
curl -s -F "client_id=${INSTAGRAM_CLIENT_ID}" -F "client_secret=${INSTAGRAM_CLIENT_SECRET}" -F "grant_type=authorization_code" -F "redirect_uri=${1}" -F "code=${code}" https://api.instagram.com/oauth/access_token | sed -e 's/.*"access_token":"\([0-9a-zA-Z\.]*\)",.*/\1/' > .instagram/access_token.txt
echo "Access token has been added"