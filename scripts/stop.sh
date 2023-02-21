#!/bin/bash
cd /home/ubuntu
sudo docker compose down
sudo docker rmi -f $(docker images -a -q)
