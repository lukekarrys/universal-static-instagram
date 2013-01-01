#!/bin/bash

export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

rake recent_instagrams
jekyll
eval "rsync ${JEKYLLGRAM_RSYNC}"
date +%H:%M:%S