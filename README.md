# AIFLO-UI Project

Welcome to the AIFLO-UI project! This guide will help you get the project up and running locally on your machine.

### Clone the Repository

First, clone the repository to your local machine using the following command:
username will be yours.

```bash
git clone https://mshoaib_aifactor@bitbucket.org/aifactor/aiflo-ui.git
```

Once cloned, navigate into the project directory:

```bash
cd aiflo-ui
```

## Installation

Follow these steps to set up the project after cloning the repository.

### Step 1: Install Node.js (Latest Version)

For Windows user : download the .exe of Node.js and insatll it by clicking next button.

- **Node.js** (Download from [Node.js official website](https://nodejs.org/en))

For Linux user : First install NVM(Version Manager) on your Ubuntu machine, visit the project’s GitHub page(https://github.com/nvm-sh/nvm). Copy the LATEST curl command from the README file that displays on the main page. This will get you the most recent version of the installation script.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

To use it, you must first source your .bashrc file:

```bash
source ~/.bashrc
```

Now, you can check with NVM which versions of Node are available:

```bash
nvm list-remote
```

It’s a very long list. You can install a latest version of Node by writing in any of the release versions listed. For instance, to get version v21.0.0, you can run:

```bash
nvm install v21.0.0
```

Now your check the installed node version:

```bash
node -v
```

**\* Note: NPM is included with Node. js installation. After you install Node. js, verify NPM installation by writing the this command in terminal or command prompt: npm -v**

### Step 2: Install Yarn Globally

If you don’t already have Node installed please first install it otherwise you can install yarn using npm:

```bash
sudo npm install -g yarn
```

To verify that Yarn was installed successfully, check the version:

```bash
yarn --version
```

### Step 3: Install Project Dependencies

Now that you have Yarn installed, use it to install all the required project dependencies. Run the following command in the project directory:
This command will read the package.json file and install all necessary packages for the project.

```bash
yarn
```

### Step 4: Start the Development Server

After the dependencies are installed, you can start the development server by running:

```bash
yarn dev
```

This will launch the project on a local server, and you should be able to view it in your browser at:
**\* http://localhost:5173**
