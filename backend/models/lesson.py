from sqlalchemy import Column, Integer, String
from database import Base

class Lesson(Base):
    __tablename__ = "lesson"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    language = Column(String, nullable=False)
    category = Column(String, nullable=False)
