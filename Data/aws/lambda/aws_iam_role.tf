﻿resource "aws_iam_role" "tf_lambda_exec_role_Immanuele_v1" {
     name = "{{lambda.role}}"

     assume_role_policy = <<EOF
{
 "Version": "2012-10-17",
 "Statement": [
     {
     "Action": "sts:AssumeRole",
     "Principal": {
         "Service": "lambda.amazonaws.com"
     },
     "Effect": "Allow",
     "Sid": ""
     }
 ]
}
EOF
}