FROM openjdk:21-jdk-slim
RUN apt-get update && \
    apt-get install -y --no-install-recommends maven=3.6.3-1 && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY . .
RUN mvn clean package
CMD ["mvn", "spring-boot:run"]