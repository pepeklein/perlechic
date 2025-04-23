# Perle Chic - Handmade Jewelry Cost Calculator

![Perle Chic](https://img.shields.io/badge/Perle%20Chic-v1.0.0-purple)
![Electron](https://img.shields.io/badge/Electron-v25.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Description

**Perle Chic** is an application developed to calculate the production and sale costs of handmade jewelry, such as bracelets and necklaces. It allows artisans to input measurements and select categories and types of materials to obtain an accurate cost and price estimate. The app also features charts to visualize the calculated values.

## Features

- **Production cost calculation** based on material categories and types.  
- **Suggested selling price** based on a configurable multiplier.  
- **User-friendly and responsive interface** with light and dark theme support.  
- **Interactive charts** to visualize costs and prices.  
- **Cross-platform compatibility** (Windows, macOS, and Linux) via Electron.

### Main Files

- **`index.html`**: HTML structure of the user interface.  
- **`styles.css`**: Custom styles for light and dark themes.  
- **`calc.js`**: Logic for cost and price calculation.  
- **`renderer.js`**: Interface handling and integration with calculations.  
- **`main.js`**: Configuration and initialization of the Electron application.

## Technologies Used

- **[Electron](https://www.electronjs.org/)**: Framework to build cross-platform desktop apps.  
- **[Chart.js](https://www.chartjs.org/)**: Library for rendering charts.  
- **[Bootstrap](https://getbootstrap.com/)**: CSS framework for responsive design.  
- **[Font Awesome](https://fontawesome.com/)**: Icons for the user interface.

## Prerequisites

- **Node.js** (v16 or higher)  
- **npm** (v7 or higher)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/perlechic.git
   cd perle_chic

2. Install the dependencies:

   ```bash
   npm install
   
3. Start the application:

   ```bash
   npm start
   
## Usage

1. Select the category (bracelet or necklace);
2. Choose the material type;
3. Enter the base and additional measurements;
4. Click Calculate to view the costs and prices;
5. View the results and charts in the interface.

## Pricing Configuration
Prices and calculation factors are defined in the calc.js file. You can adjust base values, labor, and selling multiplier as needed.

## Screenshots
### Tema Claro
<img width="774" alt="Captura de Tela 2025-04-23 às 17 12 25" src="https://github.com/user-attachments/assets/2eab6969-4b51-495f-abf7-a78327481aaa" />

### Tema Escuro
<img width="774" alt="Captura de Tela 2025-04-23 às 17 11 55" src="https://github.com/user-attachments/assets/9dcc188b-4ea0-404f-a3e4-5255fda8f077" />

## Authors
- Pedro Klein
- Gabriel Maiorani
