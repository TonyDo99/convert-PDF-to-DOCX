# -------------- Setup OS -------------- #
# Update & upgrade OS
apt update && apt upgrade && apt install curl && apt install sudo && apt install swig

# Grand permission system
sudo chmod a+rwx ./

# -------------- Setup Nodejs -------------- #
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Activate nvm
sudo sh -c source ~/.nvm/nvm.sh

# Download and install Node.js:
nvm install 22

# Install global npm
sudo apt install npm

# Install pnpm package management
sudo npm install -g pnpm@latest-10

# Verify the Node.js version:
# node -v # Should print "v22.13.1".

# Verify npm version:
# npm -v # Should print "10.9.2".

# Install package dependencies
pnpm install

# Build ts to js version
pnpm build

# ---------------- Python setup -------------- #
# Install python
apt install python3.12 && apt install pipx && apt install python-dev-is-python3 && apt-get install python3-pip

rm /usr/lib/python3.12/EXTERNALLY-MANAGED

# Go to virtual enviroment
# python3 -m venv venv
# . venv/bin/activate

# Python package management install
pip install -r python-packages.txt
# pipx install cookiecutter
# pipx runpip cookiecutter install -r python-packages.txt
