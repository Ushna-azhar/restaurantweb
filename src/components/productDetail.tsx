import { useParams } from 'react-router-dom';

// Example static product list (replace with actual API or dynamic data if necessary)
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

const ProductDetail = () => {
  const { id } = useParams(); // id parameter from URL
  const product = products.find((p) => p.id === parseInt(id, 10));

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-500">Product not found</h2>
        <p className="text-gray-600">Please check the URL or return to the product list.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-t-lg"
        />
        <div className="p-6">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {product.name}
          </h1>
          <p className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
