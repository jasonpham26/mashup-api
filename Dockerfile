# FROM node:boron

# # Copy app source
# COPY . /src

# # Set work directory to /src
# WORKDIR /src

# # Install app dependencies
# RUN npm install

# # Expose port to outside world
# EXPOSE 3000

# # Start command as per package.json
# CMD ["npm", "start"]

FROM node:boron

RUN npm install nodemon -g

WORKDIR /src

ADD package.json package.json

RUN npm install
