# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Grand permission system
sudo chmod a+rwx ./

# Activate nvm
sudo source ~/.nvm/nvm.sh

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

# Install python
sudo apt-get install python3.6

# Python package management install
sudo apt install python3-pip
sudo apt install pipx

# pymupdf package
pip3 install -r python-packages.txt

