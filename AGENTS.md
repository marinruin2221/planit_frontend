# AI Coding Guidelines

This document outlines the coding standards, technology stack, and design system for the **Planit Frontend** project. All AI-generated code must adhere to these guidelines.

## 1. Project Context
*   **Framework:** React 19
*   **Build Tool:** Vite 7
*   **Styling:** Tailwind CSS 4

## 2. Tech Stack
*   **Core:**
    *   React: 19.2.0
    *   Vite: 7.2.6
*   **Styling:**
    *   Tailwind CSS: 4.1.17
    *   Chakra UI: 3.30.0
*   **Routing:**
    *   React Router DOM: 7.10.0
*   **Key Libraries:**
    *   swiper (Slider)
    *   react-day-picker (Calendar)
    *   react-icons (Icons)

## 3. Design System
*   **Colors:**
    *   **Brand:** #DD6B20 (Primary)
    *   **Brand Hover:** #C05621
    *   **Text:** #333333 (Primary), #666666 (Secondary/Gray)
    *   **Background:** #FCFCFC
    *   **Accents:** #FF1493 (Heart), #FACC15 (Star)
*   **Font:**
    *   Family: `GMarketSans` (Light, Medium, Bold)
*   **UI Implementation Strategy:**
    *   Prioritize **Chakra UI** components for base structural elements.
    *   Use **Tailwind CSS** utility classes for custom styling, layout adjustments, and specific design requirements not covered by Chakra UI defaults.

## 4. Code Structure
*   `src/components`: Reusable UI components.
*   `src/pages`: Route-level page components.
*   `src/css`: Global styles and Tailwind configuration.
*   `src/data`: Static data and mock data storage.

## 5. AI Coding Rules
*   **No Emojis:** Do not use emojis in code comments, commit messages, or documentation.
*   **Conciseness:** Keep code and explanations brief and focused on the core logic. Avoid unnecessary boilerplate or verbose descriptions.
*   **Pathing:** Always use relative paths from the **project root** directory.
*   **Data Handling:** Until backend integration is established, exclusively use `src/data/mockData.js` for data binding and testing.