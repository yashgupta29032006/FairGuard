from sqlalchemy import create_all, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../database"))
db_path = os.path.join(DATABASE_DIR, "fairguard.db")
SQLALCHEMY_DATABASE_URL = f"sqlite:///{db_path}"

# Ensure database directory exists
os.makedirs(DATABASE_DIR, exist_ok=True)

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
