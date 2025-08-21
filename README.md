# 📄 Realtime Docs

Collaborative **real-time document editing application** (like Google Docs) built with modern web technologies.  
It enables multiple users to create, edit, and share documents with **live synchronization** and **conflict-free editing**.

---

## 🚀 Features

- 🔄 **Real-time collaboration** – edit with multiple users simultaneously  
- 📑 **Document management** – create, edit, delete, and save documents  
- 🔒 **Authentication & Authorization** – secure login and user roles  
- ⚡ **Live updates** – instant synchronization via WebSockets  
- 📂 **Persistent storage** – documents stored in the database  
- 🎨 **Modern UI** – responsive and clean design  

---

## 🛠️ Tech Stack

- **Frontend**: React / Next.js  
- **Backend**: Node.js / Express  
- **Database**: MongoDB / PostgreSQL  
- **Real-time**: WebSockets / Socket.io  
- **Authentication**: JWT / NextAuth  
- **Deployment**: Vercel / AWS / Fly.io  

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/shubhamnar93/realtime-docs.git
cd realtime-docs
```
Install dependencies:
```bash
npm install
```
Setup environment variables:
```bash
cp .env.example .env
```
👉 After copying, open the .env file and add your API keys and secrets.

Start the development server:
```bash
npm run dev
```
The app will be running at http://localhost:3000

or you could directly go to https://realtime-docs-rho.vercel.app/


