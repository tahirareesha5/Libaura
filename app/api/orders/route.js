import { NextResponse } from "next/server";

const mockOrders = [];

function isValidOrderPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  if (!payload.customer || typeof payload.customer !== "object") {
    return false;
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    return false;
  }

  if (typeof payload.total !== "number" || payload.total <= 0) {
    return false;
  }

  return true;
}

export async function POST(request) {
  try {
    const payload = await request.json();

    if (!isValidOrderPayload(payload)) {
      return NextResponse.json(
        { message: "Invalid order payload." },
        { status: 400 }
      );
    }

    const order = {
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "confirmed",
      ...payload,
    };

    mockOrders.push(order);

    return NextResponse.json(order, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Unable to create order right now." },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const order = mockOrders.find((candidate) => candidate.id === id);

    if (!order) {
      return NextResponse.json({ message: "Order not found." }, { status: 404 });
    }

    return NextResponse.json(order);
  }

  return NextResponse.json(mockOrders);
}
