# Use Ubuntu as the base image
FROM ubuntu:latest

# Set working directory inside the container
WORKDIR /app

# Keep the container running (useful for debugging)
CMD ["bash"]