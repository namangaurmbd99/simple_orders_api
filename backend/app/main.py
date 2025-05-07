from fastapi import FastAPI, Depends
from .database import create_db_and_tables, get_session
from fastapi.middleware.cors import CORSMiddleware
from .models import Customer, Product
from .schemas import CustomerCreate, ProductCreate, OrderCreate
from . import crud
from sqlmodel import Session

app = FastAPI()

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.post("/customers/")
def create_customer(data: CustomerCreate, session: Session = Depends(get_session)):
    return crud.create_customer(session, Customer(**data.dict()))

@app.get("/customers/{customer_id}")
def get_customer(customer_id: int, session: Session = Depends(get_session)):
    return crud.get_customer(session, customer_id)

@app.post("/products/")
def create_product(data: ProductCreate, session: Session = Depends(get_session)):
    return crud.create_product(session, Product(**data.dict()))

@app.post("/orders/")
def create_order(data: OrderCreate, session: Session = Depends(get_session)):
    return crud.create_order(session, data.customer_id, data.product_ids)

@app.get("/orders/{order_id}")
def get_order(order_id: int, session: Session = Depends(get_session)):
    return crud.get_order_details(session, order_id)
