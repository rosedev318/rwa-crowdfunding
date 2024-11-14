"use client";

import { useEffect, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";

import { useAuth } from "@/hooks/useAuth";
import { User } from "@/store/types";
import { useToastStore } from "@/store";

const Profile = () => {
  const [form, setForm] = useState<User | null>(null);
  const [error, setError] = useState('');

  const { user, login } = useAuth();
  const { fireToast } = useToastStore();

  useEffect(() => {
    if (user) {
      setForm({...user, password: ""});
    }
  }, [user]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    } as User);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...form }),
    });

    if (res.ok) {
      const {user}: {user: User} = await res.json();
      login(user);
      fireToast('success', 'User updated successfully!');
      setError('');
    } else {
      const data = await res.json();
      setError(data.message);
    }
  }

  return (
    <>
      <h2 className="text-3xl font-medium mb-4 text-gray-500 dark:text-gray-400">Update your profile</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {form &&
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput id="username" name="username" value={form?.username} onChange={handleFormChange} type="text" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput id="email" name="email" value={form?.email} onChange={handleFormChange} type="email" placeholder="name@flowbite.com" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput id="password" name="password" value={form?.password} onChange={handleFormChange} type="password" required />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      }
    </>
  );
};

export default Profile;
