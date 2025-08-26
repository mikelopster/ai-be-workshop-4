import { useState } from 'react';
import { Link } from 'react-router';



function Register() {
  const [formData, setFormData] = useState({
    firstName: '',           
    lastName: '',            
    email: '',                
    password: "",       
    confirmPassword: '',     
    phoneNumber: '',     
    acceptTerms: false      
  });

  const [formErrors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (formErrors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'กรุณากรอกชื่อ';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'กรุณากรอกนามสกุล';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'กรุณากรอกอีเมล';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.emailFormat = 'รูปแบบอีเมลไม่ถูกต้อง';
    }

    if (!formData.password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
    } else if (formData.password.length < 8) {
      newErrors.passwordLength = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'กรุณายืนยันรหัสผ่าน';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.passwordMismatch = 'รหัสผ่านไม่ตรงกัน';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'กรุณากรอกเบอร์โทรศัพท์';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'กรุณายอมรับข้อกำหนดและเงื่อนไข';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('สมัครสมาชิกสำเร็จ!');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header */}
      <header className="bg-web-green-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold hover:text-web-green-100 transition-colors">
                MyApp
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-web-green-100 transition-colors">
                คุณสมบัติ
              </a>
              <a href="#about" className="hover:text-web-green-100 transition-colors">
                เกี่ยวกับเรา
              </a>
              <a href="#contact" className="hover:text-web-green-100 transition-colors">
                ติดต่อเรา
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-white hover:text-web-green-100 transition-colors"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                to="/register"
                className="bg-web-green-500 hover:bg-web-green-400 text-white px-4 py-2 rounded-md transition-colors font-medium"
              >
                สมัครสมาชิก
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-white hover:text-web-green-100">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">สมัครสมาชิก</h1>
            <p className="text-neutral-500">กรอกข้อมูลเพื่อสร้างบัญชีใหม่</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-2">
              ชื่อ *
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-md border ${
                formErrors.firstName ? 'border-error' : 'border-neutral-200'
              } focus:outline-none focus:ring-2 focus:ring-web-green-500 focus:border-transparent transition-colors`}
              placeholder="กรอกชื่อของคุณ"
            />
            {formErrors.firstName && (
              <p className="mt-1 text-sm text-error">{formErrors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-2">
              นามสกุล *
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-md border ${
                formErrors.lastName ? 'border-error' : 'border-neutral-200'
              } focus:outline-none focus:ring-2 focus:ring-web-green-500 focus:border-transparent transition-colors`}
              placeholder="กรอกนามสกุลของคุณ"
            />
            {formErrors.lastName && (
              <p className="mt-1 text-sm text-error">{formErrors.lastName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
              อีเมล *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-md border ${
                formErrors.email || formErrors.emailFormat ? 'border-error' : 'border-neutral-200'
              } focus:outline-none focus:ring-2 focus:ring-web-green-500 focus:border-transparent transition-colors`}
              placeholder="example@email.com"
            />
            {(formErrors.email || formErrors.emailFormat) && (
              <p className="mt-1 text-sm text-error">{formErrors.email || formErrors.emailFormat}</p>
            )}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-neutral-700 mb-2">
              เบอร์โทรศัพท์ *
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-md border ${
                formErrors.phoneNumber ? 'border-error' : 'border-neutral-200'
              } focus:outline-none focus:ring-2 focus:ring-web-green-500 focus:border-transparent transition-colors`}
              placeholder="08X-XXX-XXXX"
            />
            {formErrors.phoneNumber && (
              <p className="mt-1 text-sm text-error">{formErrors.phoneNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
              รหัสผ่าน *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-md border ${
                formErrors.password || formErrors.passwordLength ? 'border-error' : 'border-neutral-200'
              } focus:outline-none focus:ring-2 focus:ring-web-green-500 focus:border-transparent transition-colors`}
              placeholder="รหัสผ่านอย่างน้อย 8 ตัวอักษร"
            />
            {(formErrors.password || formErrors.passwordLength) && (
              <p className="mt-1 text-sm text-error">{formErrors.password || formErrors.passwordLength}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
              ยืนยันรหัสผ่าน *
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-md border ${
                formErrors.confirmPassword || formErrors.passwordMismatch ? 'border-error' : 'border-neutral-200'
              } focus:outline-none focus:ring-2 focus:ring-web-green-500 focus:border-transparent transition-colors`}
              placeholder="กรอกรหัสผ่านอีกครั้ง"
            />
            {(formErrors.confirmPassword || formErrors.passwordMismatch) && (
              <p className="mt-1 text-sm text-error">{formErrors.confirmPassword || formErrors.passwordMismatch}</p>
            )}
          </div>

          <div>
            <label className="flex items-start space-x-3">
              <input
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-web-green-500 border-neutral-200 rounded focus:ring-web-green-500"
              />
              <span className="text-sm text-neutral-700">
                ฉันยอมรับ{' '}
                <button type="button" className="text-web-green-500 hover:text-web-green-600 underline bg-transparent border-none p-0 cursor-pointer">
                  ข้อกำหนดและเงื่อนไข
                </button>{' '}
                และ{' '}
                <button type="button" className="text-web-green-500 hover:text-web-green-600 underline bg-transparent border-none p-0 cursor-pointer">
                  นโยบายความเป็นส่วนตัว
                </button>
              </span>
            </label>
            {formErrors.acceptTerms && (
              <p className="mt-1 text-sm text-error">{formErrors.acceptTerms}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-web-green-500 hover:bg-web-green-600 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-web-green-500 focus:ring-offset-2 transition-colors"
          >
            สมัครสมาชิก
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-500">
            มีบัญชีอยู่แล้ว?{' '}
            <Link to="/login" className="text-web-green-500 hover:text-web-green-600 font-medium">
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>
      </div>
    </main>

    {/* Footer */}
    <footer className="bg-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">MyApp</h3>
            <p className="text-neutral-400 mb-4 max-w-md">
              แพลตฟอร์มที่ออกแบบมาเพื่อตอบสนองความต้องการของผู้ใช้งานในยุคดิจิทัล
            </p>
            <div className="flex space-x-4">
              <button type="button" className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button type="button" className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </button>
              <button type="button" className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">ลิงก์ด่วน</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-neutral-400 hover:text-white transition-colors">คุณสมบัติ</a></li>
              <li><a href="#about" className="text-neutral-400 hover:text-white transition-colors">เกี่ยวกับเรา</a></li>
              <li><a href="#contact" className="text-neutral-400 hover:text-white transition-colors">ติดต่อเรา</a></li>
              <li><Link to="/register" className="text-neutral-400 hover:text-white transition-colors">สมัครสมาชิก</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">ช่วยเหลือ</h4>
            <ul className="space-y-2">
              <li><button type="button" className="text-neutral-400 hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">ศูนย์ช่วยเหลือ</button></li>
              <li><button type="button" className="text-neutral-400 hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">คำถามที่พบบ่อย</button></li>
              <li><button type="button" className="text-neutral-400 hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">นโยบายความเป็นส่วนตัว</button></li>
              <li><button type="button" className="text-neutral-400 hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">ข้อกำหนดการใช้งาน</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-8 text-center">
          <p className="text-neutral-400">
            © 2025 MyApp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
  );
}

export default Register;
