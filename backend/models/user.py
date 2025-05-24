from sqlalchemy import Column, String
from database import Base

class User(Base):
    __tablename__ = "users"

    email = Column(String(255), primary_key=True, index=True)
    name = Column(String(100))
    hashed_password = Column(String(255))
