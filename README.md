# Cat Food Calculator

## Overview

The **Cat Food Calculator** is a React-based web application designed to help cat owners calculate the ideal amount of wet and dry food for their cats based on various factors like age, weight, and activity level. The application allows users to input specific details about their cat, and it generates a daily feeding recommendation. The app supports multiple languages using `react-i18next` for internationalization.

## Features

- **Multi-Language Support**: Translations available for English, Spanish, French, German, Italian, Portuguese, Dutch, Russian, Chinese (Simplified), Japanese, and Korean.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Customizable Inputs**: Users can input cat type, age, weight, and food calorie content to receive a tailored feeding guide.
- **Local Storage**: Saves user preferences to local storage for persistent data across sessions.
- **Dynamic Food Calculation**: Calculates the appropriate amount of wet and dry food based on user inputs and predefined formulas.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Provides static type definitions for enhanced development experience.
- **react-i18next**: A powerful internationalization framework for React, based on `i18next`.
- **Tailwind CSS**: A utility-first CSS framework for styling the UI.
- **localStorage**: Web storage to persist user data across sessions.

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/cat-food-calculator.git
   cd cat-food-calculator
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Run the development server:**

   Using npm:

   ```bash
   npm start
   ```

   Or using yarn:

   ```bash
   yarn start
   ```

   This will start the development server at `http://localhost:3000`.

### Usage

1. **Select Cat Type**: Choose from options like Active, Normal, Indoor, Kitten, Pregnant, or Lactating.
2. **Input Age**: Enter your cat's age in either years or months.
3. **Input Weight**: Provide your cat's weight in kilograms.
4. **Input Food Calorie Information**: Enter the calorie content per 100g for both wet and dry food.
5. **Adjust Wet/Dry Ratio**: Use the slider to set the preferred ratio between wet and dry food.
6. **View Results**: The app will display the recommended amounts of wet and dry food in grams.

### Translations

The application supports multiple languages. To add or modify translations, update the JSON files in the `public/locales` directory. The keys for the cat types and other strings are defined in these files and used within the React components.

### Customizing Cat Types

The cat types are defined as an array in the `CatFoodCalculator` component and are translated using `react-i18next`. If you wish to add or remove cat types, update the `catTypes` array and ensure that corresponding translations are available in the translation files.

### Deployment

To build the project for production, run:

Using npm:

```bash
npm run build
```

Or using yarn:

```bash
yarn build
```

The optimized build will be output to the `build` directory. You can deploy this build folder to any static hosting service like GitHub Pages, Netlify, or Vercel.

### Troubleshooting

- **Translation Issues**: If translations are not appearing as expected, ensure that the translation keys match in the JSON files and that the `useTranslation` hook is correctly implemented.
- **Local Storage**: If data is not persisting, check your browser's local storage settings and ensure the keys are correctly set and retrieved.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes. Be sure to follow the code style and include relevant tests where necessary.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

Special thanks to the open-source community and the creators of the technologies used in this project.
