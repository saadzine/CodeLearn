const BASE_URL = 'http://127.0.0.1:8000/api';

export async function signup(username: string, email: string, password: string, role: string) {
  const response = await fetch(`${BASE_URL}/signup/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password, role }),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de l’inscription');
  }

  return response.json();
}
