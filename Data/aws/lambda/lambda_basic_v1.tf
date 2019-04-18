
#Make sure this creds is confidential
provider "aws" {
  access_key = "<access key>"
  secret_key = "<secret key>"
  region    = "us-east-2"
}

{{str}}

resource "aws_lambda_function" "tf_lambda_Immanuel_v1" {
	filename="{{lambda.filename}}"
	function_name="{{lambda.functionname}}"
	role="{{lambda.role}}"
	handler="{{lambda.handler}}"
	source_code_hash="${base64sha256(file(".\\{{lambda.filename}}"))}" #define current directory
	runtime="{{lambda.runtime}}"
	memeory_size="128" #Default -128, Increases your price

	environment {
		variables={
		 {{ for env in lambda.envvariable }}
			{{env.key}}="{{env.value}}"
		 {{ end }}
		}
	}
}