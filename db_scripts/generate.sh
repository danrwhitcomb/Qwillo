#!/bin/bash

if [ "$#" -ne 1 ]; then
	echo "Error:"
	echo "generate.sh [build type]"
	exit 0
fi


echo "Requirements: "
echo "MongoDb - database utility"
echo "JQ - JSON parse utility"
echo
echo "This script will make irreversible changes to the"
echo "database at the connection string within system/config.json"
echo "Type either 1 or 2"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) break;;
        No ) exit 1;;
    esac
done

configFile="../system/config.json"

{
	mongoConnection=`jq .$1.db.connectionString < ../system/config.json`
	host=`jq .$1.db.host < $configFile | tr -d '"'`
	port=`jq .$1.db.port < $configFile | tr -d '"'`
	username=`jq .$1.db.username < $configFile | tr -d '"'`
	password=`jq .$1.db.password < $configFile | tr -d '"'`
	database=`jq .$1.db.database < $configFile | tr -d '"'`
	echo "Host: $host"
	echo "Port: $port"
	echo "Username: $username"
	echo "Password: $password"
	echo "database: $database"

} || {
	echo "Could not find config.json or it is formatted improperly"
	exit 0
}

echo "Wiping former database..."
echo $host:$port/$database
mongo $host:$port/$database -u $username -p $password --eval "db.topics.drop();"
mongo $host:$port/$database -u $username -p $password --eval "db.posts.drop();"

echo "Fetching wikipedia most visisted..."
if[]
wget -O pages.html http://en.wikipedia.org/wiki/User:West.andrew.g/Popular_pages

echo "Parsing Links..."
python htmlparser.py pages.html topics.json

echo "Writing Topics to database"
mongoimport --host $host --port $port --db $database -username $username -password $password --collection topics --file "topics.json"
echo "Complete"

exit 0