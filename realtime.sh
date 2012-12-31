#!/bin/sh

curl -s -F "client_id=${1}" -F "client_secret=${2}" -F "object=user" -F "aspect=media" -F "verify_token=jekyll_instagram" -F "callback_url=${3}" https://api.instagram.com/v1/subscriptions/