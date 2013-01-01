#!/bin/sh

curl -s -F "client_id=${INSTAGRAM_CLIENT_ID}" -F "client_secret=${INSTAGRAM_CLIENT_SECRET}" -F "object=user" -F "aspect=media" -F "verify_token=${JEKYLLGRAM_VERIFY_SUB}" -F "callback_url=${3}" https://api.instagram.com/v1/subscriptions/