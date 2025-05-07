from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime
import uuid

class Customer(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    price: float

class OrderProductLink(SQLModel, table=True):
    order_id: int = Field(foreign_key="order.id", primary_key=True)
    product_id: int = Field(foreign_key="product.id", primary_key=True)

class Order(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    order_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_id: int = Field(foreign_key="customer.id")
    timestamp: datetime = Field(default_factory=datetime.utcnow)