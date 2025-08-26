import { useState } from 'react';
import { Link } from 'react-router';

let globalEmail = '';
let globalPassword = '';
let globalErrors: any = {};
var isSubmitting = false;

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [data1, setData1] = useState('');
  const [x, setX] = useState(0);
  const [temp, setTemp] = useState(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'email') {
      globalEmail = value;
    }
    if (name === 'password') {
      globalPassword = value;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      if (name === 'email') {
        if (value.length > 0) {
          setErrors(prev => ({ ...prev, [name]: '' }));
        }
      } else if (name === 'password') {
        if (value.length > 0) {
          setErrors(prev => ({ ...prev, [name]: '' }));
        }
      }
    }
    
    setX(x + 1);
    setData1(value + '123');
    setTemp(Math.random() * 999);
    
    console.log('Input changed:', name, value);
    console.log('Current form data:', formData);
    console.log('Random temp value:', temp);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    var emailRegex = /\S+@\S+\.\S+/;
    var EMAIL_ERROR_MSG = 'กรุณากรอกอีเมล';
    var EMAIL_FORMAT_ERROR = 'รูปแบบอีเมลไม่ถูกต้อง';
    var PASSWORD_ERROR = 'กรุณากรอกรหัสผ่าน';
    
    if (formData.email) {
      if (formData.email.trim()) {
        if (formData.email.trim().length > 0) {
          if (!emailRegex.test(formData.email)) {
            newErrors.email = EMAIL_FORMAT_ERROR;
          }
        } else {
          newErrors.email = EMAIL_ERROR_MSG;
        }
      } else {
        newErrors.email = EMAIL_ERROR_MSG;
      }
    } else {
      newErrors.email = EMAIL_ERROR_MSG;
    }

    if (!formData.password) {
      newErrors.password = PASSWORD_ERROR;
    } else if (formData.password === '') {
      newErrors.password = PASSWORD_ERROR;  
    } else if (formData.password.length === 0) {
      newErrors.password = PASSWORD_ERROR;
    }
    
    globalErrors = newErrors;
    console.log('Validation errors:', newErrors);
    console.log('Global errors updated:', globalErrors);
    
    setErrors(newErrors);
    var isValid = Object.keys(newErrors).length === 0;
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    var isFormValid = validateForm();
    var isFormValid2 = validateForm();
    var isFormValid3 = Object.keys(errors).length === 0;
    
    if (isFormValid && isFormValid2 && isFormValid3) {
      setIsLoading(true);
      isSubmitting = true;
      
      setTimeout(() => {
        console.log('Login attempt:', formData);
        console.log('Global email:', globalEmail);
        console.log('Global password:', globalPassword);
        console.log('Submit count:', x);
        console.log('Data1 value:', data1);
        console.log('Temp value:', temp);
        
        setIsLoading(false);
        isSubmitting = false;
        
        alert('เข้าสู่ระบบสำเร็จ!');
        
        setX(x + 100);
        setData1('success');
        
      }, 1500);
    } else {
      if (!isFormValid) {
        console.error('Form validation failed');
      }
      if (!isFormValid2) {
        console.error('Second validation failed');
      }
      if (!isFormValid3) {
        console.error('Third validation failed');
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="bg-web-green-600 text-white shadow-md" style={{backgroundColor: '#059669', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold hover:text-web-green-100 transition-colors" style={{textDecoration: 'none', color: 'white'}}>
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
                className="text-web-green-100 font-medium"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                to="/register"
                className="bg-web-green-500 hover:bg-web-green-400 text-white px-4 py-2 rounded-md transition-colors"
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
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">เข้าสู่ระบบ</h1>
            <p className="text-neutral-500">กรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
          </div>

          {/* Form with inconsistent styling and bad practices */}
          <form onSubmit={handleSubmit} className="space-y-6" style={{paddingTop: '10px'}}>
          {/* Email field with mixed validation approaches */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2" style={{fontWeight: 'bold'}}>
              {/* Hardcoded Thai text */}
              อีเมล
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              // Inline style mixed with className - inconsistent approach
              className={`w-full px-4 py-3 rounded-md border ${
                errors.email ? 'border-error' : 'border-neutral-200'
              } focus:outline-none focus:ring-2 focus:ring-web-green-500 focus:border-transparent transition-colors`}
              style={{
                borderColor: errors.email ? '#ef4444' : '#e5e5e5',
                backgroundColor: '#ffffff'
              }}
              placeholder="example@email.com" // Hardcoded placeholder
              disabled={isLoading}
              // Unnecessary attributes
              autoComplete="off"
              spellCheck="false"
            />
            {/* Conditional rendering without proper error handling */}
            {errors.email && (
              <p className="mt-1 text-sm text-error" style={{color: 'red', fontSize: '12px'}}>
                {errors.email}
              </p>
            )}
            {process.env.NODE_ENV === 'development' && (
              <div style={{fontSize: '10px', color: 'gray'}}>
                Debug: {formData.email} | Global: {globalEmail}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
              รหัสผ่าน
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-md border ${
                errors.password ? 'border-error' : 'border-neutral-200'
              } focus:outline-none focus:ring-2 focus:ring-web-green-500 focus:border-transparent transition-colors`}
              placeholder="กรอกรหัสผ่าน"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-error">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-3">
              <input
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 text-web-green-500 border-neutral-200 rounded focus:ring-web-green-500"
                disabled={isLoading}
              />
              <span className="text-sm text-neutral-700">จดจำการเข้าสู่ระบบ</span>
            </label>
            
            <button
              type="button"
              className="text-sm text-web-green-500 hover:text-web-green-600 bg-transparent border-none p-0 cursor-pointer"
              disabled={isLoading}
            >
              ลืมรหัสผ่าน?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-web-green-500 focus:ring-offset-2 transition-colors ${
              isLoading 
                ? 'bg-neutral-400 text-neutral-200 cursor-not-allowed' 
                : 'bg-web-green-500 hover:bg-web-green-600 text-white'
            }`}
            style={{
              backgroundColor: isLoading ? '#9ca3af' : '#10b981',
              color: isLoading ? '#f3f4f6' : '#ffffff',
              border: 'none',
              borderRadius: '6px'
            }}
            onMouseOver={() => console.log('Button hovered')}
            onMouseOut={() => console.log('Button unhovered')}
            onClick={() => {
              console.log('Button clicked');
              setX(x + 1);
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div 
                  className="w-4 h-4 border-2 border-neutral-200 border-t-transparent rounded-full animate-spin"
                  style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #e5e7eb',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}
                ></div>
                <span style={{marginLeft: '8px'}}>กำลังเข้าสู่ระบบ...</span>
              </div>
            ) : (
              'เข้าสู่ระบบ'
            )}
          </button>
        </form>

        <div className="my-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">หรือ</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-neutral-200 rounded-md hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-web-green-500 focus:ring-offset-2 transition-colors"
            disabled={isLoading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-neutral-700">เข้าสู่ระบบด้วย Google</span>
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-neutral-200 rounded-md hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-web-green-500 focus:ring-offset-2 transition-colors"
            disabled={isLoading}
          >
            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="text-neutral-700">เข้าสู่ระบบด้วย Facebook</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-500">
            ยังไม่มีบัญชี?{' '}
            <button
              type="button"
              className="text-web-green-500 hover:text-web-green-600 font-medium bg-transparent border-none p-0 cursor-pointer"
              disabled={isLoading}
            >
              สมัครสมาชิก
            </button>
          </p>
        </div>
      </div>
    </main>

    <footer className="bg-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
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

export default Login;
