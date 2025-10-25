@echo off
echo Generating RSA key pair...
openssl genrsa -out privateKey.pem 2048
openssl rsa -in privateKey.pem -pubout -out publicKey.pem
echo Keys generated successfully!
echo Public key: publicKey.pem
echo Private key: privateKey.pem