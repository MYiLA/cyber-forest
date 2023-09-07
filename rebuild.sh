docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker image rm cyb-client cyb-server cyb-nginx
docker-compose build nginx server client
docker-compose up -d
echo "***************************************************"
echo "***            site has been rebuilt            ***"
echo "***************************************************"
