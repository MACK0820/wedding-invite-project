# 💍 Wedding Invitation Web App  
### CPE408A – Emerging Technologies 1 in CpE  
**Technological Institute of the Philippines – Manila**

An interactive and modern wedding invitation web application that allows guests to view event details, explore the venue location through an interactive map, and submit RSVP responses dynamically.

---

## 👥 Developers
- Francien Nicole E. Ausan  
- Maryneil G. Co  
- Kerstein Ashby C. San Pedro  

**Instructor:** Engr. Adrian Dave E. Ignacio  

---

## 🔗 Live Demo  
[https://wedding-invitation-project-olive.vercel.app/]

---

## 📌 About  

This project is a digital wedding invitation system designed to enhance user experience through interactivity and modern web technologies.

It includes:

- Wedding event details presentation  
- RSVP system for guest response tracking  
- Interactive map showing event location  
- Scroll-based animations for enhanced UI experience  

The application is built as a **single-page frontend system**, focusing on responsiveness and dynamic content rendering.

---

## 🛠️ Tech Stack  

| Technology | Purpose |
|---|---|
| React.js (v18) | Frontend framework |
| React Hooks | State and lifecycle management |
| Context API | Global state management (RSVP system) |
| React Leaflet | Interactive map integration |
| Leaflet.js | Map rendering and geolocation |
| Intersection Observer API | Scroll-based animations |
| CSS (Custom Styling) | Layout and design |
| Vite | Development server and build tool |

---

## ✨ Features  

- 💌 Digital wedding invitation interface  
- 📝 RSVP system with dynamic guest list  
- 🗺️ Interactive map with marker and location popup  
- 🎯 Scroll-triggered animations using Intersection Observer  
- ⚡ Real-time UI updates using React state  
- 📱 Responsive design for multiple screen sizes  

---

## 🧠 Advanced Implementation  

- **Context API for RSVP Management**  
  Centralized handling of guest data across components  

- **Leaflet Map Integration**  
  Displays venue location using markers and map tiles  

- **Intersection Observer API**  
  Triggers animations when elements enter the viewport  

- **Component-Based Architecture**  
  Ensures modular, reusable, and maintainable code  

## 🚀 Getting Started  

### Prerequisites  
- Node.js v14.0 or higher  
- npm  
- Git  

---

### Installation  

**1. Clone the repository**
```bash
git clone https://github.com/MACK0820/wedding-invite-project.git
cd [wedding-invite-project]
````

**2. Install dependencies**

```bash id="0ec9f4"
npm install
```

**3. Start the development server**

```bash id="q4v9s2"
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

**4. Build for production**

```bash id="m2q6jz"
npm run build
```

---

## 📁 Folder Structure

```id="6k1zt0"
src/
 ├── components/    # UI components (RSVP, Map, Sections)
 ├── assets/        # Images and static files
 ├── styles/        # CSS files
 ├── App.jsx        # Main application (context + features)
 └── main.jsx       # Entry point
```

---

## ⚠️ Notes

* The application does **not use React Router**; it is a single-page layout.
* Tailwind CSS is **not used**; styling is done using custom CSS.
* The system does **not include backend storage**; RSVP data is stored temporarily in memory.

---

## 📄 License

This project is for academic purposes only.

