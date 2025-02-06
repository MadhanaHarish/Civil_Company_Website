# Pages.md

## Pages to be Created

### 1. Home Page
- **Accessible to**: All users (Guests, CEO, TL, Customer).
- **Purpose**: Landing page introducing the company and its services.
- **Components**:
    - Brief company introduction
    - Navigation menu
    - Call-to-action buttons (Login, View Projects)

### 2. About Us
- **Accessible to**: All users.
- **Purpose**: Provides details about the company’s mission, vision, and achievements.
- **Components**:
    - Company history
    - Team information
    - Achievements

### 3. Projects
- **Accessible to**: All users.
- **Purpose**: Displays a list of available projects.
- **Components**:
    - Project listings with summary details
    - Filter/search options
    - Navigation to individual Project Details page

### 4. Project Details
- **Accessible to**: All users.
- **Purpose**: Displays in-depth information about a selected project.
- **Components**:
    - Project title, description, and status
    - Assigned team members
    - Progress updates
    - CEO-only edit/delete options

### 5. Login
- **Accessible to**: Guests.
- **Purpose**: Allows users to log in based on their role.
- **Components**:
    - Email/password input fields
    - Login button
    - Redirect to respective pages upon successful login

### 6. My Projects
- **Accessible to**: Logged-in users (CEO, TL, Customer).
- **Purpose**: Displays a list of projects relevant to the logged-in user.
- **Components**:
    - Personalized project listing
    - Navigation to respective Project Details pages

## Additional Features
- **Dynamic Navbar**: Updates links based on authentication status.
- **Role-Based Access**: Ensures users see only what they need.
- **Authentication Handling**: Redirects users based on role after login.

## Next Steps
1. Develop UI components for each page.
2. Implement role-based navigation logic.
3. Integrate backend API for fetching project data.
4. Perform testing and optimizations.

