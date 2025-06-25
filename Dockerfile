# Use an official OpenJDK image
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy everything into the image
COPY . .

# Install Node.js (for building frontend)
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    node -v && npm -v

# Make build script executable and run it
RUN chmod +x build-all.sh && ./build-all.sh

# Expose the port Spring Boot will run on
EXPOSE 8080

# Start the Spring Boot app
CMD ["java", "-jar", "backend/build/libs/CryptoVault.jar"]
# If you renamed your jar, update the filename above!