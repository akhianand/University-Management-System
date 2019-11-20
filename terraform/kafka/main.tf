data "aws_ami" "ubuntu_18_image" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-bionic-18.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

data "template_file" "userdata" {
  template = "${file("${path.module}/kafka_userdata.sh")}"
}

resource "aws_instance" "kafka_single_node" {
  associate_public_ip_address = true

  ami                    = "${data.aws_ami.ubuntu_18_image.id}"
  instance_type          = "t2.small"
  key_name               = "${var.key_name}"
  subnet_id              = "${var.subnet_id}"
  user_data              = "${data.template_file.userdata.rendered}"
  vpc_security_group_ids = ["${aws_security_group.kafka_sg.id}"]
  root_block_device {
    volume_type = "standard"
  }

  tags = {
    Name = "Kafka Single Node"
  }

}

resource "aws_security_group" "kafka_sg" {
  name   = "kafka_sg"
  vpc_id = "${var.vpc_id}"

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Kafka_Security_Group"
  }
}