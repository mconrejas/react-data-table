
# Responsive React Data Table Component in React with Server and Local Pagination

This project demonstrates a reusable, responsive data table component in React with advanced features like server-side pagination, sorting, and searching. It uses **React Query**, **Context API**, **Tailwind CSS**, and **DummyJSON API** for data handling and styling.

## Features

- **Server-Side & Local Pagination**: Supports both server and local pagination, configurable via `isServerSide` prop.
- **Search Functionality**: Enables search functionality using the DummyJSON API's search endpoint.
- **Reusable Components**: The `Table` and child components (`TableHeader`, `TablePagination`, `TableRow`, `TableSearch`) are modular and reusable.
- **Responsive Design**: Fully responsive and styled with Tailwind CSS.
  
## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components Overview](#components-overview)
- [Configuration](#configuration)
- [License](#license)

---

## Installation

1. **Install Dependencies**:
   ```bash
   yarn install
   ```

2. **Run the Project**:
   ```bash
   yarn start
   ```

---

## Usage

The project uses a flexible data table that fetches data from DummyJSON API. You can:
- **Filter/Search**: Use the search bar to filter items from the data if `isServerSide` is false, and filters data based on search query if `isServerSide` is true.
- **Sort**: Click on column headers to sort by specific columns.
- **Pagination**: Navigate between pages with offset-based pagination when using server-side mode.
- **Switch between Local and Server-side Mode**: Set `isServerSide` in `Table` to toggle between local and server-side data handling.

### Example Usage in Code

```javascript
import React from 'react';
import DataTable from './components/DataTable';

const App = () => {
  return (
    <DataTable 
      // Required props
      columns={'Your columns'} 
      data={'Your data array'} 
      loading={true | false}
      totalItems={'Total number of items'}

      // Optional props
      noDataMessage={'Optional message, can be a string or JSX component'}
      isServerSide={'Can be true or false or excluded, If set to true you must provide following props below to make your pagination, sorting, search api request work.'}
      onPageChange={'Function that returns the current page'}
      onPageSizeChange={'Function that returns the selected page size'}
      onSearch={'Function that returns the search string'}
      onSortChange={'Function that returns sort field and direction'}
    />
  );
};

export default App;
```

---

## Components Overview

- **`Table`**: Main table component, coordinating data display, sorting, and pagination.
- **`TableContext`**: Context API for sharing table state between components, with support for toggling between server-side and local data handling.
- **`LoadingSpinner`**: Displays a loading spinner during data fetching.

---

### Tailwind CSS

Tailwind CSS configuration is set up in `tailwind.config.js`, allowing customization for breakpoints, colors, and other utilities.

---

## License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).