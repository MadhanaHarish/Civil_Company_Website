# **Navigation Documentation**

# **FIGMA URL:** 
'https://www.figma.com/proto/5wLZJC1HA6EZC60et8Qg7g/Madhan?node-id=0-1&t=PiEGiMmtzSMFrg2k-1'

## **Pages Overview**
The application consists of the following pages:
1. **Home**
2. **About Us**
3. **Projects**
4. **Project Details**
5. **Login**
6. **My Projects**

---

## **Navigation Flow**
### **1. Home Page**
- **Accessible to**: All users (Guests, CEO, TL, Customer).
- **Navbar Links**:
    - Home
    - About Us
    - Projects
    - My Projects (visible only after login)
    - Login (visible only when not logged in)
- **Description**: The default landing page of the website. Provides a brief introduction to the company and its services.

---

### **2. About Us**
- **Accessible to**: All users (Guests, CEO, TL, Customer).
- **Navbar Links**: Same as Home Page.
- **Description**: Displays information about the company, its mission, vision, and achievements.

---

### **3. Projects**
- **Accessible to**: All users (Guests, CEO, TL, Customer).
- **Navbar Links**: Same as Home Page.
- **Functionality**:
    - **Guests**: View a list of all projects (read-only).
    - **CEO**:
        - View all projects.
        - Create new projects.
        - Assign projects to Team Leaders (TLs).
        - Update project details.
        - Delete projects.
    - **TL**: View all projects (read-only).
    - **Customer**: View all projects (read-only).
- **Description**: Displays a list of all projects. Clicking on a project redirects to the **Project Details** page.

---

### **4. Project Details**
- **Accessible to**: All users (Guests, CEO, TL, Customer).
- **Navbar Links**: Same as Home Page.
- **Functionality**:
    - **Guests**: View project details (read-only).
    - **CEO**:
        - View project details.
        - Update project details.
        - Delete the project.
    - **TL**: View project details (read-only).
    - **Customer**: View project details (read-only).
- **Description**: Displays detailed information about a specific project, including its status, tasks, and assigned team members.

---

### **5. Login**
- **Accessible to**: Guests (not logged-in users).
- **Navbar Links**: Same as Home Page.
- **Description**: Allows users to log in based on their role (CEO, TL, Customer). After successful login, redirects to the **My Projects** page (for Customers and TLs) or **Projects** page (for CEO).

---

### **6. My Projects**
- **Accessible to**: Logged-in users (CEO, TL, Customer).
- **Navbar Links**: Same as Home Page.
- **Functionality**:
    - **CEO**:
        - View all projects in the company.
        - Perform actions like updating or deleting projects.
    - **TL**:
        - View projects assigned to them.
        - Update task completion status.
    - **Customer**:
        - View their assigned projects.
        - Check the current status of their projects (e.g., checklist or progress percentage).
- **Description**: Displays a list of projects relevant to the logged-in user. Clicking on a project redirects to the **Project Details** page.

---

## **User Roles and Access**
### **1. CEO**
- **Projects Page**:
    - Create, update, and delete projects.
    - Assign projects to Team Leaders.
- **My Projects Page**:
    - View all projects in the company.
    - Perform actions like updating or deleting projects.

### **2. Team Leader (TL)**
- **Projects Page**:
    - View all projects (read-only).
- **My Projects Page**:
    - View projects assigned to them.
    - Update task completion status.

### **3. Customer**
- **Projects Page**:
    - View all projects (read-only).
- **My Projects Page**:
    - View their assigned projects.
    - Check the current status of their projects.

### **4. Guest**
- **Projects Page**:
    - View all projects (read-only).
- **About Us Page**:
    - View company information.

---

## **Common Features**
- **Navbar**:
    - Visible on all pages.
    - Dynamically updates based on login status and user role.
- **Project Details**:
    - Accessible by clicking on a project from either the **Projects** or **My Projects** page.
- **Authentication**:
    - Users must log in to access the **My Projects** page.
    - Guests can only view the **About Us** and **Projects** pages.

---

## **Next Steps**
1. Implement the **Navbar** with dynamic links based on user roles.
2. Create reusable components for **Project List** and **Project Details**.
3. Set up role-based access control for each page.
4. Integrate the backend API for project creation, updates, and task management.

---
