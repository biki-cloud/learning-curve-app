#!/bin/bash
awslocal s3 mb s3://test-bucket
cd /home/localstack/data/
awslocal s3 cp sample.txt s3://test-bucket/
awslocal s3 ls s3://test-bucket