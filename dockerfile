#Imagen base node
FROM node:latest

#Directorio de trabajo
WORKDIR /dist

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./


#Copiar archivos
COPY . .

#Instalar dependencias
RUN npm install

#Puerto
EXPOSE 3000

#Compilar typescript
RUN npm run build

# Copiar la carpeta public a dist/public
RUN npm run copy-public

#Comando para iniciar la aplicación
CMD ["node", "dist/index.js"]