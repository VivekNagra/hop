# Documentation: Running React and Django Locally

## Prerequisites
Ensure the following tools are installed on your machine:
1. **Python** (3.8 or later)
2. **Node.js** (LTS version recommended)
3. **npm** or **yarn** (comes with Node.js installation)
4. **pip** (Python package installer)
5. **virtualenv** (optional but recommended for Python environments)

---

## Backend: Django

### Steps:
1. **Extract the File**  
   Extract the `diabetes_be` folder.

2. **Create a Virtual Environment**  
   Run the following commands:  
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
Activate the virtual environment every time before running the project.

### Install Dependencies
Install required Python packages:


```bash
pip install -r requirements.txt
```

Create a Database
Set up a PostgreSQL database with the following details:
Database Name: diabetes

###Run Migrations
Apply database migrations:
```bash
python manage.py migrate
```

### Start the Backend Server
Start the Django server:
```bash
python manage.py runserver
```

The backend server will be running at: http://127.0.0.1:8000.

#Frontend: React
Steps:
Extract the Code
Extract the diabetes folder.

### Install Dependencies
Install required dependencies:
```bash
yarn install
```

### Start the Frontend Server
Run the development server:
```bash
yarn run dev
```
The React app will be available at: http://localhost:5173.

** Running the Application
Start the Backend Server
Run the following command:
```bash
python manage.py runserver
```
Start the Frontend Server
Run the following command:

```bash
yarn run dev
```
Access the Application
Open your browser and navigate to: http://localhost:5173.
