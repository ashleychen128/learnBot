from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database import SessionLocal
from models.lesson import Lesson

router = APIRouter()

# Dependency
async def get_db():
    async with SessionLocal() as session:
        yield session

@router.get("/")
async def get_lessons(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Lesson))
    lessons = result.scalars().all()
    return [
        {
            "id": lesson.lesson_id,
            "title": lesson.title,
            "language": lesson.language,
            "category": lesson.category,
        }
        for lesson in lessons
    ]

