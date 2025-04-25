# Use official Python image
FROM python:3.10

# Set working directory
WORKDIR /app

# Install system dependencies (for pymysql)
RUN apt-get update && apt-get install -y gcc default-libmysqlclient-dev

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Run FastAPI app with Uvicorn
CMD ["uvicorn", "main:siva", "--host", "0.0.0.0", "--port", "8000"]
