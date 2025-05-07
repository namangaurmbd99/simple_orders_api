from sqlmodel import Session, select
from .models import Customer, Product, Order, OrderProductLink
from fastapi import HTTPException

def create_customer(session: Session, customer: Customer):
    session.add(customer)
    session.commit()
    session.refresh(customer)
    return customer

def create_product(session: Session, product: Product):
    session.add(product)
    session.commit()
    session.refresh(product)
    return product

def create_order(session: Session, customer_id: int, product_ids: list):
    customer = session.get(Customer, customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    order = Order(customer_id=customer_id)
    session.add(order)
    session.commit()

    for pid in product_ids:
        product = session.get(Product, pid)
        if not product:
            raise HTTPException(status_code=404, detail=f"Product with ID {pid} not found")
        link = OrderProductLink(order_id=order.id, product_id=pid)
        session.add(link)
    session.commit()
    session.refresh(order)
    return order

def get_order_details(session: Session, order_id: int):
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    stmt = select(OrderProductLink).where(OrderProductLink.order_id == order_id)
    links = session.exec(stmt).all()

    products = []
    total = 0.0
    for link in links:
        product = session.get(Product, link.product_id)
        products.append(product)
        total += product.price
    return {"order_id": order.order_id, "products": products, "total": total}
