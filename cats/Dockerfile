FROM openjdk:21-jdk-slim

RUN apt-get update && \
     apt-get install -y --no-install-recommends wget=1.21.1-1ubuntu1 unzip=6.0-21ubuntu1 && \
    rm -rf /var/lib/apt/lists/*

ENV MAVEN_VERSION=3.9.4

RUN wget --progress=dot:giga https://downloads.apache.org/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.zip && \
    unzip apache-maven-${MAVEN_VERSION}-bin.zip -d /opt/ && \
    rm apache-maven-${MAVEN_VERSION}-bin.zip && \
    ln -s /opt/apache-maven-${MAVEN_VERSION}/bin/mvn /usr/bin/mvn

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY . .
RUN mvn clean package
CMD ["mvn", "spring-boot:run"]