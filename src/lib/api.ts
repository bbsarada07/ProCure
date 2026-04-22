const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export async function extractCriteria(file: File) {
  const formData = new FormData();
  // Ensure the field name matches what FastAPI expects. In our extraction.py it expects `file` as UploadFile
  formData.append('file', file);
  
  const response = await fetch(`${API_BASE_URL}/extraction/process-tender`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Extraction failed');
  }
  
  return response.json();
}

export async function evaluateBidder(tenderId: string, bidderFiles: File[]) {
  const formData = new FormData();
  formData.append('tender_id', tenderId);
  bidderFiles.forEach(file => {
    formData.append('bidder_documents', file);
  });
  
  const response = await fetch(`${API_BASE_URL}/evaluation/evaluate-bidder`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
     throw new Error('Evaluation failed');
  }
  
  return response.json();
}
