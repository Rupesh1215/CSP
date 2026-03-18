import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { Camp, Vaccine, Scheme, AuditLog, InsertCamp, InsertVaccine, InsertScheme } from "@shared/schema";

interface AdminDashboardProps {
  adminToken: string;
}

export default function AdminDashboard({ adminToken }: AdminDashboardProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("camps");
  const [editingCamp, setEditingCamp] = useState<Camp | null>(null);
  const [editingVaccine, setEditingVaccine] = useState<Vaccine | null>(null);
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [campFormOpen, setCampFormOpen] = useState(false);
  const [vaccineFormOpen, setVaccineFormOpen] = useState(false);
  const [schemeFormOpen, setSchemeFormOpen] = useState(false);

  const { data: camps } = useQuery<Camp[]>({ queryKey: ['/api/camps'] });
  const { data: vaccines } = useQuery<Vaccine[]>({ queryKey: ['/api/vaccines'] });
  const { data: schemes } = useQuery<Scheme[]>({ queryKey: ['/api/schemes'] });
  const { data: logs } = useQuery<AuditLog[]>({ queryKey: ['/api/admin/logs'] });

  const createCampMutation = useMutation({
    mutationFn: async (data: InsertCamp) => {
      return await apiRequest('POST', '/api/admin/camps', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/camps'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/logs'] });
      setCampFormOpen(false);
      toast({ title: "Success", description: "Camp created successfully" });
    }
  });

  const updateCampMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertCamp }) => {
      return await apiRequest('PUT', `/api/admin/camps/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/camps'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/logs'] });
      setEditingCamp(null);
      setCampFormOpen(false);
      toast({ title: "Success", description: "Camp updated successfully" });
    }
  });

  const deleteCampMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest('DELETE', `/api/admin/camps/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/camps'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/logs'] });
      setDeletingId(null);
      toast({ title: "Success", description: "Camp deleted successfully" });
    }
  });

  const createVaccineMutation = useMutation({
    mutationFn: async (data: InsertVaccine) => {
      return await apiRequest('POST', '/api/admin/vaccines', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/vaccines'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/logs'] });
      setVaccineFormOpen(false);
      toast({ title: "Success", description: "Vaccine created successfully" });
    }
  });

  const updateVaccineMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertVaccine }) => {
      return await apiRequest('PUT', `/api/admin/vaccines/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/vaccines'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/logs'] });
      setEditingVaccine(null);
      setVaccineFormOpen(false);
      toast({ title: "Success", description: "Vaccine updated successfully" });
    }
  });

  const deleteVaccineMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest('DELETE', `/api/admin/vaccines/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/vaccines'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/logs'] });
      setDeletingId(null);
      toast({ title: "Success", description: "Vaccine deleted successfully" });
    }
  });

  const createSchemeMutation = useMutation({
    mutationFn: async (data: InsertScheme) => {
      return await apiRequest('POST', '/api/admin/schemes', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/schemes'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/logs'] });
      setSchemeFormOpen(false);
      toast({ title: "Success", description: "Scheme created successfully" });
    }
  });

  const updateSchemeMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertScheme }) => {
      return await apiRequest('PUT', `/api/admin/schemes/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/schemes'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/logs'] });
      setEditingScheme(null);
      setSchemeFormOpen(false);
      toast({ title: "Success", description: "Scheme updated successfully" });
    }
  });

  const deleteSchemeMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest('DELETE', `/api/admin/schemes/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/schemes'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/logs'] });
      setDeletingId(null);
      toast({ title: "Success", description: "Scheme deleted successfully" });
    }
  });

  const CampForm = ({ camp, onSubmit, onClose }: { camp?: Camp | null; onSubmit: any; onClose: () => void }) => {
    const [formData, setFormData] = useState<InsertCamp>(camp ? {
      title: camp.title,
      date: new Date(camp.date).toISOString().split('T')[0],
      time: camp.time,
      location: camp.location,
      type: camp.type,
      description: camp.description,
      status: camp.status,
      imageUrl: camp.imageUrl
    } : {
      title: '',
      date: '',
      time: '',
      location: '',
      type: 'General' as const,
      description: '',
      status: 'upcoming' as const,
      imageUrl: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (camp) {
        onSubmit.mutate({ id: camp._id, data: formData });
      } else {
        onSubmit.mutate(formData);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required data-testid="input-camp-title" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">Date *</Label>
            <Input id="date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required data-testid="input-camp-date" />
          </div>
          <div>
            <Label htmlFor="time">Time *</Label>
            <Input id="time" type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} required data-testid="input-camp-time" />
          </div>
        </div>
        <div>
          <Label htmlFor="location">Location *</Label>
          <Input id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required data-testid="input-camp-location" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type">Type *</Label>
            <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
              <SelectTrigger data-testid="select-camp-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Vaccination">Vaccination</SelectItem>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Specialty">Specialty</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Status *</Label>
            <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
              <SelectTrigger data-testid="select-camp-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="imageUrl">Image URL (optional)</Label>
          <Input id="imageUrl" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} data-testid="input-camp-image" />
        </div>
        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows={4} data-testid="textarea-camp-description" />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={onSubmit.isPending} data-testid="button-submit-camp">
            {onSubmit.isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </form>
    );
  };

  const VaccineForm = ({ vaccine, onSubmit, onClose }: { vaccine?: Vaccine | null; onSubmit: any; onClose: () => void }) => {
    const [formData, setFormData] = useState<InsertVaccine>(vaccine ? {
      name: vaccine.name,
      ageGroup: vaccine.ageGroup,
      scheduleNotes: vaccine.scheduleNotes,
      nextDoseInfo: vaccine.nextDoseInfo
    } : {
      name: '',
      ageGroup: '',
      scheduleNotes: '',
      nextDoseInfo: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (vaccine) {
        onSubmit.mutate({ id: vaccine._id, data: formData });
      } else {
        onSubmit.mutate(formData);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Vaccine Name *</Label>
          <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required data-testid="input-vaccine-name" />
        </div>
        <div>
          <Label htmlFor="ageGroup">Age Group *</Label>
          <Input id="ageGroup" value={formData.ageGroup} onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })} required placeholder="e.g., 0-2 months, Children 5-12 years" data-testid="input-vaccine-agegroup" />
        </div>
        <div>
          <Label htmlFor="scheduleNotes">Schedule Notes *</Label>
          <Textarea id="scheduleNotes" value={formData.scheduleNotes} onChange={(e) => setFormData({ ...formData, scheduleNotes: e.target.value })} required rows={3} data-testid="textarea-vaccine-schedule" />
        </div>
        <div>
          <Label htmlFor="nextDoseInfo">Next Dose Information</Label>
          <Textarea id="nextDoseInfo" value={formData.nextDoseInfo} onChange={(e) => setFormData({ ...formData, nextDoseInfo: e.target.value })} rows={2} data-testid="textarea-vaccine-nextdose" />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={onSubmit.isPending} data-testid="button-submit-vaccine">
            {onSubmit.isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </form>
    );
  };

  const SchemeForm = ({ scheme, onSubmit, onClose }: { scheme?: Scheme | null; onSubmit: any; onClose: () => void }) => {
    const [formData, setFormData] = useState<InsertScheme>(scheme ? {
      name: scheme.name,
      eligibility: scheme.eligibility,
      benefits: scheme.benefits,
      description: scheme.description
    } : {
      name: '',
      eligibility: '',
      benefits: '',
      description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (scheme) {
        onSubmit.mutate({ id: scheme._id, data: formData });
      } else {
        onSubmit.mutate(formData);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Scheme Name *</Label>
          <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required data-testid="input-scheme-name" />
        </div>
        <div>
          <Label htmlFor="eligibility">Eligibility *</Label>
          <Textarea id="eligibility" value={formData.eligibility} onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })} required rows={2} data-testid="textarea-scheme-eligibility" />
        </div>
        <div>
          <Label htmlFor="benefits">Benefits *</Label>
          <Textarea id="benefits" value={formData.benefits} onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} required rows={2} data-testid="textarea-scheme-benefits" />
        </div>
        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows={3} data-testid="textarea-scheme-description" />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={onSubmit.isPending} data-testid="button-submit-scheme">
            {onSubmit.isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </form>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-dashboard-title">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage health camps, vaccines, and schemes</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="camps" data-testid="tab-camps">Health Camps</TabsTrigger>
            <TabsTrigger value="vaccines" data-testid="tab-vaccines">Vaccines</TabsTrigger>
            <TabsTrigger value="schemes" data-testid="tab-schemes">Schemes</TabsTrigger>
            <TabsTrigger value="logs" data-testid="tab-logs">Activity Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="camps" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Health Camps</h2>
              <Dialog open={campFormOpen} onOpenChange={setCampFormOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingCamp(null)} data-testid="button-add-camp">
                    <Plus className="mr-2" size={18} />
                    Add Camp
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingCamp ? 'Edit Camp' : 'Add New Camp'}</DialogTitle>
                  </DialogHeader>
                  <CampForm camp={editingCamp} onSubmit={editingCamp ? updateCampMutation : createCampMutation} onClose={() => { setCampFormOpen(false); setEditingCamp(null); }} />
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid gap-4">
              {camps?.map((camp) => (
                <Card key={camp._id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{camp.title}</h3>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p><Calendar size={14} className="inline mr-1" />{new Date(camp.date).toLocaleDateString()} • {camp.time}</p>
                          <p>{camp.location} • {camp.type}</p>
                          <p>Status: {camp.status}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => { setEditingCamp(camp); setCampFormOpen(true); }} data-testid={`button-edit-camp-${camp._id}`}>
                          <Pencil size={14} />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => setDeletingId(camp._id)} data-testid={`button-delete-camp-${camp._id}`}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vaccines" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Vaccines</h2>
              <Dialog open={vaccineFormOpen} onOpenChange={setVaccineFormOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingVaccine(null)} data-testid="button-add-vaccine">
                    <Plus className="mr-2" size={18} />
                    Add Vaccine
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingVaccine ? 'Edit Vaccine' : 'Add New Vaccine'}</DialogTitle>
                  </DialogHeader>
                  <VaccineForm vaccine={editingVaccine} onSubmit={editingVaccine ? updateVaccineMutation : createVaccineMutation} onClose={() => { setVaccineFormOpen(false); setEditingVaccine(null); }} />
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid gap-4">
              {vaccines?.map((vaccine) => (
                <Card key={vaccine._id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{vaccine.name}</h3>
                        <p className="text-sm text-muted-foreground">Age Group: {vaccine.ageGroup}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => { setEditingVaccine(vaccine); setVaccineFormOpen(true); }} data-testid={`button-edit-vaccine-${vaccine._id}`}>
                          <Pencil size={14} />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => setDeletingId(vaccine._id)} data-testid={`button-delete-vaccine-${vaccine._id}`}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schemes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Schemes</h2>
              <Dialog open={schemeFormOpen} onOpenChange={setSchemeFormOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingScheme(null)} data-testid="button-add-scheme">
                    <Plus className="mr-2" size={18} />
                    Add Scheme
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingScheme ? 'Edit Scheme' : 'Add New Scheme'}</DialogTitle>
                  </DialogHeader>
                  <SchemeForm scheme={editingScheme} onSubmit={editingScheme ? updateSchemeMutation : createSchemeMutation} onClose={() => { setSchemeFormOpen(false); setEditingScheme(null); }} />
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid gap-4">
              {schemes?.map((scheme) => (
                <Card key={scheme._id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{scheme.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{scheme.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => { setEditingScheme(scheme); setSchemeFormOpen(true); }} data-testid={`button-edit-scheme-${scheme._id}`}>
                          <Pencil size={14} />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => setDeletingId(scheme._id)} data-testid={`button-delete-scheme-${scheme._id}`}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <h2 className="text-2xl font-bold">Recent Activity</h2>
            <div className="space-y-2">
              {logs?.slice(0, 20).map((log) => (
                <Card key={log._id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start text-sm">
                      <div>
                        <p className="font-medium">{log.action}</p>
                        <p className="text-muted-foreground">By: {log.adminEmail}</p>
                        <p className="text-xs text-muted-foreground">{log.details}</p>
                      </div>
                      <p className="text-muted-foreground text-xs">{new Date(log.timestamp).toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <AlertDialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this item.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (activeTab === 'camps') deleteCampMutation.mutate(deletingId!);
                  else if (activeTab === 'vaccines') deleteVaccineMutation.mutate(deletingId!);
                  else if (activeTab === 'schemes') deleteSchemeMutation.mutate(deletingId!);
                }}
                data-testid="button-confirm-delete"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
