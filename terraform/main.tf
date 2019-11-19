provider "aws" {
    region = "us-east-1"
}

module "riak_cluster" {
  source             = "./riak"
  key_name           = "development-key"
  vpc_id             = "vpc-0b0bc9155912376b0"
  private_subnet_ids = ["subnet-09b59edbd6fa12772", "subnet-0440fdcf82c592346", "subnet-057e6f0cb68cd588c"]
}

module "kafka" {
  source = "./kafka"
  key_name = "development-key"
  vpc_id            = "vpc-0b0bc9155912376b0"
  subnet_id              = "subnet-0a11733014719ad12"
} 