import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin, Heart } from 'lucide-react';

export function Footer() {
  // Dynamic data (can be fetched from backend)
  const footerData = {
    brand: {
      name: 'HERITAGE By NN',
      description: 'Where Elegance Meets Forever. Crafting timeless bridal wear with heritage techniques and luxury fabrics.',
    },
    socialLinks: {
      instagram: 'https://www.instagram.com/heritagebynn',
      facebook: 'https://www.facebook.com/heritagebynn',
      email: 'mailto:info@heritagebynn.com',
    },
    quickLinks: [
      { label: 'Shop All', path: '/shop' },
      { label: 'Bridal Collection', path: '/shop?category=Bridal' },
      { label: 'Lookbook', path: '/lookbook' },
      { label: 'Formal Wear', path: '/shop?category=Formal' },
      { label: 'Party Wear', path: '/shop?category=Party Wear' },
    ],
    customerCare: [
      { label: 'Contact Us', path: '/contact' },
      { label: 'Size Guide', path: '/size-guide' },
      { label: 'Shipping Info', path: '/shipping' },
      { label: 'Returns & Exchange', path: '/returns' },
      { label: 'Care Instructions', path: '/care' },
    ],
    contactInfo: {
      address: ['Fashion Central Mall', 'Karachi, Sindh 75600'],
      phone: '+92 300 1234567',
      email: 'info@heritagebynn.com',
      whatsapp: 'https://wa.me/923313103442',
    },
    legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
    ],
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      {/* Newsletter Section */}
      <div className="py-12 sm:py-16" style={{ backgroundColor: '#fdf2f8' }}>
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl sm:text-2xl font-serif mb-3 sm:mb-4" style={{ color: '#3E0309' }}>
            Join Our Bridal Journey
          </h3>
          <p className="text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
            Get exclusive updates on new collections, styling tips, and special offers
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base"
              style={{ '--tw-ring-color': '#3E0309' } as any}
            />
            <button
              type="submit"
              className="px-4 sm:px-6 py-2 sm:py-3 text-white rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base font-medium"
              style={{ backgroundColor: '#3E0309' }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
          {/* Brand Info */}
          <div className="space-y-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2">
              <div className="text-center lg:text-left">
                <div className="text-lg sm:text-xl font-bold font-serif tracking-wider" style={{ color: '#3E0309' }}>
                  {footerData.brand.name.split(' By ')[0]}
                </div>
                <div className="text-xs font-light italic -mt-1" style={{ color: '#3E0309' }}>
                  By {footerData.brand.name.split(' By ')[1]}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto lg:mx-0">
              {footerData.brand.description}
            </p>
            <div className="flex space-x-4 justify-center lg:justify-start">
              <a href={footerData.socialLinks.instagram} className="text-gray-400 hover:text-[#3E0309] transition-colors">
                <Instagram size={20} />
              </a>
              <a href={footerData.socialLinks.facebook} className="text-gray-400 hover:text-[#3E0309] transition-colors">
                <Facebook size={20} />
              </a>
              <a href={footerData.socialLinks.email} className="text-gray-400 hover:text-[#3E0309] transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center lg:text-left">
            <h4 className="font-semibold" style={{ color: '#3E0309' }}>Quick Links</h4>
            <nav className="space-y-2">
              {footerData.quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`block text-gray-600 text-sm transition-colors hover:opacity-80 ${index > 2 ? 'hidden lg:block' : ''}`}
                  style={{ '--tw-hover-color': '#3E0309' } as any}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Customer Care */}
          <div className="space-y-4 text-center lg:text-left">
            <h4 className="font-semibold" style={{ color: '#3E0309' }}>Customer Care</h4>
            <nav className="space-y-2">
              {footerData.customerCare.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`block text-gray-600 text-sm transition-colors hover:opacity-80 ${index > 1 ? 'hidden lg:block' : ''}`}
                  style={{ '--tw-hover-color': '#3E0309' } as any}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-center lg:text-left">
            <h4 className="font-semibold" style={{ color: '#3E0309' }}>Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 justify-center lg:justify-start">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#3E0309' }} />
                <div className="text-sm text-gray-600 text-center lg:text-left">
                  {footerData.contactInfo.address.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-3 justify-center lg:justify-start">
                <Phone size={16} className="flex-shrink-0" style={{ color: '#3E0309' }} />
                <span className="text-sm text-gray-600">{footerData.contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3 justify-center lg:justify-start">
                <Mail size={16} className="flex-shrink-0" style={{ color: '#3E0309' }} />
                <span className="text-sm text-gray-600 break-all">{footerData.contactInfo.email}</span>
              </div>
            </div>
            <div className="pt-4 flex justify-center lg:justify-start">
              <a
                href={footerData.contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} HeritageByNN. All rights reserved.
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>Made with</span>
              <Heart size={14} style={{ color: '#3E0309' }} />
              <span>for timeless elegance</span>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
              {footerData.legal.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="transition-colors hover:opacity-80"
                  style={{ '--tw-hover-color': '#3E0309' } as any}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
