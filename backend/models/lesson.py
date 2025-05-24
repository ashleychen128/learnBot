from sqlalchemy import Column, Integer, String, Text, Enum, DateTime, TIMESTAMP
from database import Base
import enum
from datetime import datetime

class DifficultyEnum(str, enum.Enum):
    easy = "easy"
    medium = "medium"
    hard = "hard"

class Lesson(Base):
    __tablename__ = "lesson"

    lesson_id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    difficulty = Column(Enum(DifficultyEnum), nullable=False)
    language = Column(String(50), nullable=True)
    category = Column(String(100), nullable=True)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=True)
