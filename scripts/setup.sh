#!/bin/bash
cd /home/ubuntu
sudo docker image rm 433086244466.dkr.ecr.us-west-2.amazonaws.com/test:latest
sudo docker pull tom54699/tobicord:latest