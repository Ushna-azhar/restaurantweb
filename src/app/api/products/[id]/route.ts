
import { NextResponse } from 'next';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Example product data (replace with actual database/API fetching)
  const products = [
    { id: 1, name: 'Nihari', price: 10.99, image: '/p1.jpeg', description: 'Delicious Nihari' },
    { id: 2, name: 'Biryani', price: 8.99, image: '/p2.jpg', description: 'Delicious Biryani' },
    // Add more products here...
  ];

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}
