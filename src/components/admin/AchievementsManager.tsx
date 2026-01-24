import { useState } from 'react';
import { useAchievements, useCreateAchievement, useUpdateAchievement, useDeleteAchievement, Achievement } from '@/hooks/usePortfolioData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, ExternalLink, Award, Trophy, Medal, Star, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const getIcon = (type: Achievement['type']) => {
  switch (type) {
    case 'certification': return <Medal className="w-5 h-5 text-blue-400" />;
    case 'award': return <Trophy className="w-5 h-5 text-yellow-400" />;
    case 'achievement': return <Star className="w-5 h-5 text-purple-400" />;
  }
};

export const AchievementsManager = () => {
  const { data: achievements, isLoading } = useAchievements();
  const createAchievement = useCreateAchievement();
  const updateAchievement = useUpdateAchievement();
  const deleteAchievement = useDeleteAchievement();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    date: '',
    type: 'certification' as Achievement['type'],
    description: '',
    credential_url: '',
    display_order: 0,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      organization: '',
      date: '',
      type: 'certification',
      description: '',
      credential_url: '',
      display_order: 0,
    });
    setEditingAchievement(null);
  };

  const openEditDialog = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setFormData({
      title: achievement.title,
      organization: achievement.organization,
      date: achievement.date,
      type: achievement.type,
      description: achievement.description || '',
      credential_url: achievement.credential_url || '',
      display_order: achievement.display_order,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const achievementData = {
      title: formData.title,
      organization: formData.organization,
      date: formData.date,
      type: formData.type,
      description: formData.description || null,
      credential_url: formData.credential_url || null,
      display_order: formData.display_order,
    };

    try {
      if (editingAchievement) {
        await updateAchievement.mutateAsync({ id: editingAchievement.id, ...achievementData });
        toast.success('Achievement updated successfully');
      } else {
        await createAchievement.mutateAsync(achievementData);
        toast.success('Achievement created successfully');
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to save achievement');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAchievement.mutateAsync(id);
      toast.success('Achievement deleted successfully');
    } catch (error) {
      toast.error('Failed to delete achievement');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
          <p className="text-muted-foreground">Manage your certifications and awards</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Achievement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: Achievement['type']) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="certification">Certification</SelectItem>
                      <SelectItem value="award">Award</SelectItem>
                      <SelectItem value="achievement">Achievement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization *</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g., 2024"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="credential_url">Credential URL</Label>
                  <Input
                    id="credential_url"
                    type="url"
                    value={formData.credential_url}
                    onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createAchievement.isPending || updateAchievement.isPending}>
                  {(createAchievement.isPending || updateAchievement.isPending) && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {editingAchievement ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Achievements List */}
      <div className="grid gap-4">
        {achievements?.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No achievements yet. Add your first achievement!
          </div>
        )}
        {achievements?.map((achievement) => (
          <div
            key={achievement.id}
            className="p-4 bg-card border border-border rounded-xl flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                {getIcon(achievement.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                  <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full capitalize">
                    {achievement.type}
                  </span>
                </div>
                <p className="text-sm text-primary font-medium">{achievement.organization}</p>
                {achievement.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{achievement.description}</p>
                )}
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>{achievement.date}</span>
                  {achievement.credential_url && (
                    <a href={achievement.credential_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                      <ExternalLink className="w-3 h-3" /> View Credential
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => openEditDialog(achievement)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Achievement</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{achievement.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(achievement.id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
