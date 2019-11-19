#!/bin/bash
set -x

exec > >(tee /var/log/user-data.log|logger -t user-data ) 2>&1

yum -y update

# sleep 10
# riak start
# sleep 10