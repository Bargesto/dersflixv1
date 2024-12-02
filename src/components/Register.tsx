import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSite } from '../context/SiteContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { themeColor, siteName } = useSite();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const success = await register(formData.email, formData.password, formData.name);
      if (success) {
        navigate('/');
      } else {
        setError('Failed to create account. Email might be already in use.');
      }
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundImage: `url('https://elznljzfbrnpjgolibec.supabase.co/storage/v1/object/public/dersflixlogo/arkaplan_dersflix.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="max-w-md w-full mx-4 relative z-10">
        <div className="bg-black/40 backdrop-blur-md p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Register for {siteName}</h2>
          {error && (
            <div className="bg-red-500/70 backdrop-blur-sm text-white p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-white/90">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/10 backdrop-blur-sm rounded-md px-4 py-2 text-white placeholder-white/50 border border-white/10 focus:border-white/30 transition-colors"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block mb-1 text-white/90">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/10 backdrop-blur-sm rounded-md px-4 py-2 text-white placeholder-white/50 border border-white/10 focus:border-white/30 transition-colors"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block mb-1 text-white/90">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white/10 backdrop-blur-sm rounded-md px-4 py-2 text-white placeholder-white/50 border border-white/10 focus:border-white/30 transition-colors"
                placeholder="Choose a password"
                minLength={6}
              />
            </div>
            <div>
              <label className="block mb-1 text-white/90">Confirm Password</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full bg-white/10 backdrop-blur-sm rounded-md px-4 py-2 text-white placeholder-white/50 border border-white/10 focus:border-white/30 transition-colors"
                placeholder="Confirm your password"
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: themeColor }}
              className="w-full text-white py-2 rounded-md hover:opacity-90 transition mt-6 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>
          <p className="mt-4 text-center text-white/70">
            Already have an account?{' '}
            <Link
              to="/login"
              style={{ color: themeColor }}
              className="hover:opacity-90"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;