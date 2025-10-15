import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import api from '../utils/api';

export function CheckoutPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'COD',
  });
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);

  const WHATSAPP_NUMBER = '923313103442'; 

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50000 ? 0 : 1500;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(''); // Clear previous errors
    const file = e.target.files?.[0];
    if (!file) {
      setError('No file selected');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Only JPEG and PNG images are allowed');
      return;
    }
    // Validate image content
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) {
        setError('Failed to read file');
        return;
      }
      const img = new Image();
      img.onload = () => {
        console.log('Image validated:', file.name);
        setPaymentScreenshot(file);
      };
      img.onerror = () => setError('Invalid image file. Please upload a valid JPEG or PNG.');
      img.src = event.target.result as string;
    };
    reader.onerror = () => setError('Failed to read file');
    reader.readAsDataURL(file);
  };

  // 🆕 JUST THIS ONE FUNCTION ADDED (3 lines!)
  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
  };

  const handleCheckout = async () => {
    if (formData.paymentMethod === 'BankTransfer' && !paymentScreenshot) {
      setError('Please upload a payment screenshot for bank transfer');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const orderData = new FormData();
      orderData.append('items', JSON.stringify(state.cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        image: item.images[0],
      }))));
      orderData.append('customer', JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
      }));
      orderData.append('subtotal', subtotal.toString());
      orderData.append('shipping', shipping.toString());
      orderData.append('total', total.toString());
      orderData.append('paymentMethod', formData.paymentMethod);
      orderData.append('status', 'Pending');
      if (paymentScreenshot) {
        orderData.append('paymentScreenshot', paymentScreenshot);
      }

      const response = await api.post('/orders', orderData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      dispatch({ type: 'CLEAR_CART' });
      navigate(`/order-success/${response.data._id}`);
    } catch (err: any) {
      console.error('Checkout failed:', err);
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif" style={{ color: '#3E0309' }}>Checkout</h1>
          <Link
            to="/cart"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            style={{ color: '#3E0309' }}
          >
            <ArrowLeft size={20} />
            <span>Back to Cart</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6" style={{ color: '#3E0309' }}>
              Shipping Information
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="COD">Cash on Delivery</option>
                  <option value="BankTransfer">Bank Transfer</option>
                </select>
              </div>
              {formData.paymentMethod === 'BankTransfer' && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: '#3E0309' }}>
                    Bank Transfer Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">SadaPay</p>
                      <p className="text-gray-600">Account: 03001234567</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Easypaisa</p>
                      <p className="text-gray-600">Account: 03001234567</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">UBL Bank</p>
                      <p className="text-gray-600">Account: 03001234567</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-blue-300">
                      <p className="font-medium text-gray-700 mb-1">
                        Upload payment screenshot:
                      </p>
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        Please upload a JPEG or PNG image (max 5MB).
                      </p>
                      {/* 🆕 JUST THIS BUTTON ADDED! */}
                      <button
                        onClick={openWhatsApp}
                        className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2"
                      >
                        And send the screenshot on WhatsApp Chat
                      </button>
                      <p className="text-xs text-gray-600 mt-2 text-center"></p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#3E0309' }}>
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800">
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-sm text-green-600">🎉 You've qualified for free shipping!</p>
                )}
                {shipping > 0 && (
                  <p className="text-sm text-gray-600">
                    Spend {formatPrice(50000 - subtotal)} more for free shipping
                  </p>
                )}
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-semibold">
                  <span style={{ color: '#3E0309' }}>Total</span>
                  <span style={{ color: '#3E0309' }}>{formatPrice(total)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isProcessing || !formData.name || !formData.email || !formData.phone || !formData.address}
                className="w-full text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#3E0309' }}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600 mb-2">Secure checkout powered by SSL</p>
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <span>We accept:</span>
                  <span>COD • Bank Transfer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
