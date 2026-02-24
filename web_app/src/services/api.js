const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function scanProduct(file, userMedicalAilments = 'None') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userMedicalAilments', userMedicalAilments);

  const res = await fetch(`${API_BASE}/eco-agent/product-details`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function generateDIY(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/diy/generate`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function analyseReport(file, userId = 'demo') {
  const formData = new FormData();
  formData.append('fileInput', file);
  formData.append('userId', userId);

  const res = await fetch(`${API_BASE}/report-storage/analyse-and-upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
