import { NextResponse } from 'next/server';

// Sample mock product data
const products = [
  { id: 1, name: 'Nihari', price: 10.99, image: '/p1.jpeg', description: 'Delicious Nihari' },
  { id: 2, name: 'Biryani', price: 8.99, image: '/p2.jpg', description: 'Delicious Biryani' },
  { id: 3, name: 'Qorma', price: 12.99, image: '/p3.webp', description: 'Badami Qorma' },
  { id: 4, name: 'Karahi', price: 7.99, image: '/p4.jpg', description: 'Shahi Karahi' },
  { id: 5, name: 'Haleem', price: 14.99, image: '/p5.webp', description: 'Deghi Haleem' },
  { id: 6, name: 'Chicken Pulao', price: 9.99, image: '/p6.jpg', description: 'Delicious Pulao' },
  { id: 7, name: 'Desi Kheer Special', price: 19.99, image: '/p7.jpg', description: 'Kheer' },
  { id: 8, name: 'Desi Zarda Special', price: 4.99, image: '/p8.jpg', description: 'Overloaded Zarda' },
  { id: 9, name: 'Qorma', price: 15.99, image: '/qorma.jpg', description: 'Rich and flavorful Qorma' },
  { id: 10, name: 'Naan', price: 3.99, image: '/naan.jpg', description: 'Soft and fluffy Naan' },
  { id: 11, name: 'Kulcha', price: 4.99, image: '/kul.jpg', description: 'Delicious and warm Kulcha' },
  { id: 12, name: 'Chapati', price: 2.99, image: '/roti.jpg', description: 'Freshly made Chapati' },
  { id: 13, name: 'Cold Drink', price: 1.99, image: '/cd1.jpg', description: 'Chilled and refreshing Cold Drink' },
  { id: 14, name: 'Tea', price: 2.49, image: '/tea1.jpeg', description: 'Refreshing Cold Tea' },
  { id: 15, name: 'Water', price: 0.99, image: '/water.webp', description: 'Pure and fresh Water' },
];

export async function GET(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const productId = parseInt(id, 10);  // Parsing the id into an integer

  // Check if the id is valid
  if (isNaN(productId)) {
    return NextResponse.json({ message: `Invalid product id: ${id}` }, { status: 400 });
  }

  // Find the product from the mock data
  const product = products.find((p) => p.id === productId);

  // If product not found
  if (!product) {
    return NextResponse.json({ message: `Product with id: ${id} not found` }, { status: 404 });
  }

  // Return the product data if found
  return NextResponse.json(product);
}
