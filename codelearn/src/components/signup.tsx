import React, { useState } from 'react';
import { signup } from '../api';

export default function SignupForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'student' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signup(form.username, form.email, form.password, form.role);
      console.log('Inscription réussie :', result);
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Nom d'utilisateur" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="student">Étudiant</option>
        <option value="teacher">Enseignant</option>
      </select>
      <button type="submit">S'inscrire</button>
    </form>
  );
}
