FROM openjdk:21-jdk-slim
RUN apt-get update && apt-get install -y maven
COPY . /app
WORKDIR /app
RUN mvn clean package
CMD ["mvn", "spring-boot:run"]