# finalrpoject



Build a responsive, interactive anime-themed landing page with HTML5, CSS, and JavaScript that meets the following strict criteria:

1. HTML5 Semantic Structure
Use correct HTML5 tags:

<header>, <nav>, <main>, <section>, <article>, <footer>

<form> for user input (registration/contact)

<dialog> (optional for modals)

2. Responsive Design (Mobile-First)
Breakpoints: 320px, 480px, 768px, 1024px (use @media queries).

Fluid layouts (Flexbox/Grid).

Burger menu for mobile (hidden on desktop, toggles on click).

3. Styling & Hover Effects
Custom Google Fonts (e.g., "Poppins" for headings, "Roboto" for body).

Smooth transitions (e.g., buttons, cards).

Hover effects:

Nav links underline on hover.

Anime cards scale up (transform: scale(1.05)).

Buttons change color smoothly.

4. Form with JavaScript Validation
Form type: Registration (or contact).

Fields:

Name (required, letters only).

Email (valid email regex).

Password (min 8 chars, show/hide toggle).

Validation:

Real-time error messages.

Prevents submission if invalid.

Regex for email/name validation.

5. Fetch Data from an API (Async/Await)
Use fetch() or Axios to get anime data (e.g., Jikan API).

Display popular anime in a grid (title, image, rating).

Handle loading/error states.

6. Additional JavaScript Logic
Choose 1 feature:

Dropdown navigation (genre selector).

Header background change on scroll (transparent → solid).

Scroll-to-top button (appears after 300px).

Section animations (AOS.js or vanilla JS IntersectionObserver).

7. localStorage / sessionStorage / Cookies
Cookie consent popup:

"This site uses cookies. [Accept] [Decline]".

On "Accept", hide forever (store in localStorage).

8. Burger Menu Functionality
Hamburger icon (☰) on mobile.

Click toggles a slide-in menu.

Close button (X) inside menu.

