# Ubuntu 16.04
# Oracle Java 1.8.0_101 64 bit
# Maven 3.3.9
# Nodejs
# NPM



FROM ubuntu:16.04

MAINTAINER josemanuelCRV (https://github.com/josemanuelCRV)

# this is a non-interactive automated build - avoid some warning messages
ENV DEBIAN_FRONTEND noninteractive

# Update dpkg repositories
RUN apt-get update 

# Install wget
RUN apt-get install -y wget




# MAVEN
# --------------------------

# Install maven
ENV MAVEN_VERSION 3.3.9
ENV MAVEN_HOME /usr/lib/mvn
ENV PATH $MAVEN_HOME/bin:$PATH

RUN wget http://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz && \
  tar -zxvf apache-maven-$MAVEN_VERSION-bin.tar.gz && \
  rm apache-maven-$MAVEN_VERSION-bin.tar.gz && \
  mv apache-maven-$MAVEN_VERSION /usr/lib/mvn

# Remove download archive files
RUN apt-get clean



# JAVA
# -----------------------------
# Set shell variables for java installation
ENV java_version 1.8.0_131
ENV filename jdk-8u131-linux-x64.tar.gz

# Download java, accepting the license agreement
RUN wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u131-b11/d54c1d3a095b4ff2b6607d096fa80163/jdk-8u131-linux-x64.tar.gz" 

# Unpack java
RUN mkdir /opt/java-oracle && tar -zxf $filename -C /opt/java-oracle/
ENV JAVA_HOME /opt/java-oracle/jdk$java_version
ENV PATH $JAVA_HOME/bin:$PATH

# Configure symbolic links for the java and javac executables
RUN update-alternatives --install /usr/bin/java java $JAVA_HOME/bin/java 20000 && update-alternatives --install /usr/bin/javac javac $JAVA_HOME/bin/javac 20000

# Install git
RUN apt-get install -y git


# Node.js
# -------------------------

# Install Node.js
RUN apt-get install --yes curl
RUN curl --silent --location https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential


# Confirm installation
RUN node -v
RUN npm -v


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
