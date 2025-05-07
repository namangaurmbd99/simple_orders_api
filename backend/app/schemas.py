from pydantic import BaseModel, EmailStr
from typing import List

class CustomerCreate(BaseModel):
    name: str
    email: EmailStr

class ProductCreate(BaseModel):
    name: str
    price: float

class OrderCreate(BaseModel):
    customer_id: int
    product_ids: List[int]
