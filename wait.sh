#!/bin/sh

# Wait until mongo is ready
while ! /usr/bin/mongo --eval "db.version()" > /dev/null 2>&1; do sleep 0.1; done