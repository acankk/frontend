import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { Pencil, Save, X, LogOut, ShieldCheck, User } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const fetchMe = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
      setForm({
        username: res.data.username || "",
        email: res.data.email || "",
        password: "",
      });
    } catch {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) return navigate("/login");
    fetchMe();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const payload = {
        username: form.username,
        email: form.email,
      };
      if (form.password) payload.password = form.password;

      await api.patch("/auth/me", payload);

      setEdit(false);
      fetchMe();
    } catch (err) {
      alert(err.response?.data?.detail || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEdit(false);
    setForm({
      username: user.username,
      email: user.email,
      password: "",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-10 flex justify-center">
      <div className="w-full max-w-7xl space-y-10">

        {/* HEADER */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
            <User />
          </div>
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-gray-400 text-sm">Manage your account information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* LEFT INFO CARD */}
          <Card className="bg-white/5 border-white/10 text-white">
            <CardContent className="pt-10 flex flex-col items-center">

              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-white/10 flex items-center justify-center text-4xl font-bold ring-4 ring-white/10">
                  {user.username?.[0]?.toUpperCase()}
                </div>
              </div>

              <h2 className="mt-5 text-xl font-semibold">{user.username}</h2>
              <p className="text-gray-400 text-sm">{user.email}</p>

              <div className="grid grid-cols-2 gap-4 w-full mt-8 text-sm">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <p className="text-gray-400">Role</p>
                  <p className="font-semibold mt-1 flex items-center justify-center gap-1">
                    <ShieldCheck size={14} /> User
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <p className="text-gray-400">Status</p>
                  <p className="font-semibold mt-1">Verified</p>
                </div>
              </div>

              <Button
                onClick={handleLogout}
                variant="destructive"
                className="mt-10 w-full"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>

            </CardContent>
          </Card>

          {/* RIGHT FORM CARD */}
          <Card className="md:col-span-2 bg-white/5 border-white/10 text-white">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <p className="text-sm text-gray-400 mt-1">
                  Update your account details
                </p>
              </div>

              {!edit ? (
                <Button onClick={() => setEdit(true)} variant="secondary" className="gap-2">
                  <Pencil size={16} /> Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleUpdate} disabled={loading} className="gap-2">
                    <Save size={16} /> Save
                  </Button>
                  <Button onClick={handleCancel} variant="ghost" className="gap-2">
                    <X size={16} /> Cancel
                  </Button>
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-6">

              <div className="space-y-2">
                <Label>Username</Label>
                <Input name="username" value={form.username} onChange={handleChange} disabled={!edit} />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input name="email" value={form.email} onChange={handleChange} disabled={!edit} />
              </div>

              <Separator className="bg-white/10" />

              <div className="space-y-2">
                <Label>New Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  disabled={!edit}
                  placeholder="Leave blank if unchanged"
                />
                <p className="text-xs text-gray-400">
                  Only fill this if you want to change your password
                </p>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
