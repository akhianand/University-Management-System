resource "aws_instance" "riak" {
  count                       = 3
  ami                         = "ami-1c34050b"
  instance_type               = "t2.micro"
  key_name                    = "${var.key_name}"
  subnet_id              = "${var.private_subnet_ids[count.index]}"
  associate_public_ip_address = false
  user_data                   = "${data.template_file.userdata.rendered}"
  vpc_security_group_ids      = ["${aws_security_group.riak_sg.id}"]
  root_block_device {
    volume_type = "standard"
  }

  tags = {
    Name = "Riak-Node-${count.index + 1}"
  }

}

data "template_file" "userdata" {
  template = "${file("${path.module}/riak_userdata.sh")}"
}

resource "aws_security_group" "riak_sg" {
  name   = "riak_sg"
  vpc_id = "${var.vpc_id}"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8087
    to_port     = 8087
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8098
    to_port     = 8098
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
      from_port = 0
      to_port = 65535
      protocol = "tcp"
      self = true
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Riak_Security_Group"
  }
}