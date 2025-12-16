import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@supabase/supabase-js';

export const AdminProjectButton = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    git_repo_url: '',
    deployed_url: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          checkAdminRole(session.user.id);
        } else {
          setIsAdmin(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase.rpc('has_role', {
      _user_id: userId,
      _role: 'admin',
    });
    
    if (!error && data) {
      setIsAdmin(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast({
        title: 'Name required',
        description: 'Please enter a project name.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('projects').insert({
      name: formData.name,
      description: formData.description || null,
      git_repo_url: formData.git_repo_url || null,
      deployed_url: formData.deployed_url || null,
      show_on_desktop: true,
    });

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Project added!',
        description: 'Your project has been added successfully.',
      });
      setFormData({ name: '', description: '', git_repo_url: '', deployed_url: '' });
      setShowForm(false);
    }

    setLoading(false);
  };

  if (!user || !isAdmin) return null;

  return (
    <>
      {/* Plus button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-28 right-6 z-50 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/20 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Add New Project</h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Project Name *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="My Awesome Project"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description (optional)
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="A brief description of your project..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 min-h-[80px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  GitHub Link (optional)
                </label>
                <Input
                  value={formData.git_repo_url}
                  onChange={(e) => setFormData({ ...formData, git_repo_url: e.target.value })}
                  placeholder="https://github.com/..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Deployed Link (optional)
                </label>
                <Input
                  value={formData.deployed_url}
                  onChange={(e) => setFormData({ ...formData, deployed_url: e.target.value })}
                  placeholder="https://myproject.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border-white/20 text-slate-300 hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? 'Adding...' : 'Add Project'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
