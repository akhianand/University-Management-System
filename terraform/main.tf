provider "aws" {
    region = "us-east-1"
}

module "riak_cluster" {
  source             = "./riak"
  key_name           = "development-key"
  vpc_id             = "vpc-05f9e04a9b3f131e9"
  private_subnet_ids = ["subnet-04b08c276ce1452ad", "subnet-06f0c2b254a1bf2d6", "subnet-08849e57e32538724"]
}

module "kafka" {
  source = "./kafka"
  key_name = "development-key"
  vpc_id            = "vpc-05f9e04a9b3f131e9"
  subnet_id              = "subnet-02805c108a4bd3cc3"
} 