# Use JDK base
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Install Node.js for frontend build
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    node -v && npm -v

# Copy everything and build
COPY . .

# Add Gradle fix
RUN echo "org.gradle.java.installations.auto-download=false" >> gradle.properties

# Build both frontend and backend
RUN chmod +x build-all.sh && ./build-all.sh

EXPOSE 8080

CMD ["java", "-jar", "backend/build/libs/CryptoVault.jar"]