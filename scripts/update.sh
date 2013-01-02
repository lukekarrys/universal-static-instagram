#!/bin/bash

export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

rake recent_instagrams
jekyll
rake deploy
date +%H:%M:%S