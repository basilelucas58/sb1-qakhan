rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper Functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    // Cliente Rules
    match /clientes/{clienteId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && isOwner(clienteId);
      allow update: if isAuthenticated() && isOwner(clienteId);
      allow delete: if false; // Soft delete only through status update
    }
    
    // Servicio Rules
    match /servicios/{servicioId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && 
        exists(/databases/$(database)/documents/clientes/$(request.resource.data.cliente_id));
      allow update: if isAuthenticated() && 
        get(/databases/$(database)/documents/clientes/$(resource.data.cliente_id)).data.id == request.auth.uid;
      allow delete: if false; // Use status updates instead
    }
  }
}