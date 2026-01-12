# ApplicationForm Context Usage

## Overview

The ApplicationForm can now be opened from anywhere in your app using the `useApplicationForm` hook.

## Usage Examples

### Basic Usage - Open form without product

```tsx
import { useApplicationForm } from "@/lib/ApplicationFormContext";

function MyComponent() {
  const { openForm } = useApplicationForm();

  return (
    <button onClick={() => openForm()}>
      Open Application Form
    </button>
  );
}
```

### Open form with a specific product

```tsx
import { useApplicationForm } from "@/lib/ApplicationFormContext";

function ProductCard({ product }) {
  const { openForm } = useApplicationForm();

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => openForm(product.id)}>
        Apply for this product
      </button>
    </div>
  );
}
```

### Close form programmatically

```tsx
import { useApplicationForm } from "@/lib/ApplicationFormContext";

function MyComponent() {
  const { closeForm } = useApplicationForm();

  return (
    <button onClick={closeForm}>
      Close Form
    </button>
  );
}
```

### Check if form is open

```tsx
import { useApplicationForm } from "@/lib/ApplicationFormContext";

function MyComponent() {
  const { opened, productId } = useApplicationForm();

  return (
    <div>
      <p>Form is {opened ? "open" : "closed"}</p>
      {productId && <p>Selected product ID: {productId}</p>}
    </div>
  );
}
```

## API Reference

### `useApplicationForm()` Hook

Returns an object with the following properties:

- **`opened`** (`boolean`) - Whether the form is currently open
- **`productId`** (`number | undefined`) - The ID of the selected product (if any)
- **`openForm`** (`(productId?: number) => void`) - Function to open the form
- **`closeForm`** (`() => void`) - Function to close the form

## Example: Button in Header

```tsx
// src/widgets/Header.tsx
import { useApplicationForm } from "@/lib/ApplicationFormContext";

export function Header() {
  const { openForm } = useApplicationForm();

  return (
    <header>
      <nav>
        {/* ... other nav items ... */}
        <button 
          onClick={() => openForm()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Оставьте заявку
        </button>
      </nav>
    </header>
  );
}
```

## Example: Product Card

```tsx
// src/components/ProductCard.tsx
import { useApplicationForm } from "@/lib/ApplicationFormContext";

export function ProductCard({ product }) {
  const { openForm } = useApplicationForm();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <button 
        onClick={() => openForm(product.id)}
        className="apply-button"
      >
        Оформить заявку
      </button>
    </div>
  );
}
```

## Notes

- The `ApplicationForm` component is automatically rendered at the root level in `App.tsx`
- You don't need to import or render `ApplicationForm` in your components
- The form state is managed globally and persists across route changes
- When the form closes, the `productId` is automatically reset
