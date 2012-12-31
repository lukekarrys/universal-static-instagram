#!/bin/bash

export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

rake recent_instagrams
jekyll
rsync -avze 'ssh -p 22' --delete public/ $JEKYLLGRAM_DEPLOY
date +%H:%M:%S