import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          navigate('/');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Welcome back!',
        description: 'Successfully logged in.',
      });
    }

    setLoading(false);
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Missing fields',
        description: 'Please enter email and password.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await supabase.functions.invoke('setup-admin', {
        body: { email, password },
      });

      if (response.error) {
        toast({
          title: 'Setup failed',
          description: response.error.message,
          variant: 'destructive',
        });
      } else if (response.data?.error) {
        toast({
          title: 'Setup failed',
          description: response.data.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Account created!',
          description: 'You can now login with your credentials.',
        });
        setIsSetup(false);
      }
    } catch (error) {
      toast({
        title: 'Setup failed',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isSetup ? 'Initial Setup' : 'Admin Login'}
            </h1>
            <p className="text-slate-400">AK Portfolio Dashboard</p>
          </div>

          <form onSubmit={isSetup ? handleSetup : handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                required
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? 'Please wait...' : isSetup ? 'Create Admin Account' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSetup(!isSetup)}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {isSetup ? 'Already have an account? Sign in' : 'First time? Setup admin account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
