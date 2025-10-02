# Fichier d'exemple pour Docker
FROM node:18-slim

# Installer les dépendances système pour Electron
RUN apt-get update && apt-get install -y \
    libatk1.0-0 \
    libgtk-3-0 \
    libnss3 \
    libxss1 \
    libasound2 \
    libgconf-2-4 \
    libxrandr2 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libdrm2 \
    libxss1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le code source
COPY . .

# Exposer le port pour développement (si serveur web)
EXPOSE 3000

# Commande par défaut
CMD ["npm", "start"]