# 🍳 RecipeFinds

RecipeFinds is a clean and responsive React app that helps you find and explore recipes from around the world.  
You can search for meals, check their ingredients, read instructions, and even watch YouTube tutorials — all powered by the [TheMealDB API](https://www.themealdb.com/).

Built with **React**, **Vite**, and **Tailwind CSS**, this project focuses on simplicity, speed, and a smooth user experience.

---

##  What You Can Do

-  **Search Recipes** — Look up meals by name using live data from TheMealDB API  
- **Browse Recipes** — See meal cards with the dish name, category, and cuisine  
-  **View Details** — Get full ingredients, step-by-step instructions, and source links  
- **Watch Tutorials** — Embedded YouTube videos for selected recipes  
- **Handle Errors Gracefully** — Friendly messages for empty searches or failed requests  
-  **Responsive Layout** — Works great on desktop, tablet, and mobile screens  

---

##  Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React (Vite)** | Fast and modern frontend framework |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **React Router DOM** | For handling multiple pages and navigation |
| **TheMealDB API** | Recipe data source |
| **Axios / Fetch** | To make API requests |
| *(Optional)* **Framer Motion** | Adds subtle animations and transitions |

---

##  Getting Started

Follow these steps to set up and run the app locally 

1. **Clone this repository**
   ```bash
   git clone https://github.com/yourusername/RecipeFinds.git
   cd RecipeFinds
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

---

##  API Reference

The app uses the free [TheMealDB API](https://www.themealdb.com/api.php) for all recipe data.

**Search recipes by name:**
```
https://www.themealdb.com/api/json/v1/1/search.php?s=<recipe_name>
```

**Example:**
```
https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
```

---

## Notes

- Input validation ensures search queries aren’t empty  
- Displays friendly messages if no recipes match  
- Lightweight UI built with Tailwind utilities  
- Data loads quickly and reuses cached results for smoother navigation  

---

##  License

This project is open source under the **MIT License**.  
Feel free to use, modify, or expand it for your own projects.


_Developed with ❤️ and React_
