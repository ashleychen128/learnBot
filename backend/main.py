from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.future import select
from database import engine, Base, SessionLocal
from routers import auth, lesson
from models.lesson import Lesson

app = FastAPI()

# ✅ CORS 設定（允許前端存取）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://127.0.0.1:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ 啟動時建立資料表與課程種子資料
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with SessionLocal() as session:
        result = await session.execute(select(Lesson))
        existing = result.scalars().first()
        if not existing:
            session.add_all([
                Lesson(name="Intro to AI", language="English", category="Artificial Intelligence"),
                Lesson(name="Python Basics", language="English", category="Programming"),
                Lesson(name="深度學習入門", language="中文", category="人工智慧"),
                Lesson(name="資料結構概論", language="中文", category="電腦科學")
            ])
            await session.commit()

# ✅ 註冊路由
app.include_router(auth.router, prefix="/auth")
app.include_router(lesson.router, prefix="/lessons")
