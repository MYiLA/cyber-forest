docker stop cyb-client cyb-server
docker rm cyb-client cyb-server
docker image rm cyb-client cyb-server
docker compose build server client
docker compose up -d
echo "***************************************************"
echo "***            site has been rebuilt            ***"
echo "***************************************************"
