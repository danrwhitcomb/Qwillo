#!/bin/bash

echo "Wiping former database..."
mongo local_mongoose --eval "db.dropDatabase();"

echo "Writing Categories to database"
mongoimport --db local_mongoose --collection Category --file category.json

echo "Fetching wikipedia most visisted..."
wget -O pages.html http://en.wikipedia.org/wiki/User:West.andrew.g/Popular_pages

echo "Parsing Links..."
python htmlparser.py pages.html topics.json

echo "Writing Topics to database"
mongoimport --db local_mongoose --collection Topic --file topics.json
echo "Complete"

