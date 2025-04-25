import time
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError

# SQLite DB path — this will create a file `users.db` in your backend container
DATABASE_URL = "sqlite:///./users.db"

# Create engine
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})  # Required for SQLite with FastAPI

# Create sessionmaker instance
session = sessionmaker(bind=engine, autoflush=False, autocommit=False)

# Define base class for declarative models
Base = declarative_base()

def wait_for_db_connection():
    """Check if SQLite file is accessible (minimal check)"""
    try:
        with engine.connect() as connection:
            print("SQLite database connection successful.")
            return connection
    except OperationalError as e:
        print("Error connecting to SQLite DB:", e)
        raise

# Try to connect
try:
    wait_for_db_connection()
    print("Successfully connected to the SQLite database")
except Exception as e:
    print(f"Database connection error: {e}")
