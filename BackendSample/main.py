from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, session
from sqlalchemy.orm import Session
from model import User
from schema import UserSchema

Base.metadata.create_all(bind=engine)
siva = FastAPI()

siva.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # your React frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # allow all HTTP methods
    allow_headers=["*"],  # allow all headers
)

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()

@siva.get("/")
async def root():
    return {"message": "Hello World"}

@siva.post("/postdata")
def postdata(user: UserSchema, db: Session = Depends(get_db)):
    user = User(email=user.email, password=user.password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@siva.get("/getall")
def getall(db: Session = Depends(get_db)):
    return db.query(User).all()

@siva.get("/getuser/{email}")
def getuser(email: str, db: Session = Depends(get_db)):
    return db.query(User).filter(User.email == email).first()

@siva.get("/delete/{email}")
def delete(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    db.delete(user)
    db.commit()
    return "Deleted Sucessfully"

@siva.put("/update/{email}")
def update_user(email: str, updated_user: UserSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.email = updated_user.email
    user.password = updated_user.password
    db.commit()
    db.refresh(user)
    return user
