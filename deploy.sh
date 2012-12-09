#!/bin/sh

rsync --size-only -avze 'ssh -p 22' --delete _site/ `cat config.txt`
