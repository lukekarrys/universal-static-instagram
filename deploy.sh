#!/bin/sh

rsync -avze 'ssh -p 22' --delete _site/ `cat config.txt`
