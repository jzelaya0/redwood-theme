# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development purposes.

## Prerequisites

What you will need to install the software and how to install them.

### Node
You will need the current LTS (long-term support) release which you can download directly from the [Node website](https://nodejs.org/en/).

It's recommended that you install NVM as a Node Version Manager. NVM allows you to easily switch between different Node versions. You can install it by running the following script in your terminal:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

For further instructions on how to use NVM visit the [GitHub repo](https://github.com/creationix/nvm#usage).

### Yarn or npm 5+
Follow the instructions on how to get started with [Yarn](https://yarnpkg.com/en/docs/install)

## Project Set Up

1. To get started with the Redwood Starter Theme, run the following command in your terminal from your workspace:  ```$ yarn create jzelaya0/redwood-theme my-new-theme```
2. Navigate to the starter theme ```$ cd my-new-theme```  and install the necessary packages by running ```$ yarn install```.
3. After packages have been installed run ```$ yarn build ```. This will build the project files into a _dist_ folder.
4. Then run ```$ yarn zip ```. This will create a zip file containing your theme.

## Connecting to a Store

1. Upload the **starter-theme.zip** file in the shop admin.
2. Create a new private app with theme **template & assets** permissions.
3. Create a new *.env* file at the root of your project.
4. Copy & paste the placeholder contents from *.env.example* into *.env*
5. Replace the existing values with the newly created private app credentials and the uploaded theme's id.
6. In the terminal run ```yarn start``` or ```yarn start --skipFirstDeploy``` to begin developing.
