# Tailwind Dynamic Classes 

A utility library for dynamically using tailwind css classes

## `text-${color}-500   ` ❌

Example usage:


```js
import { bgColor500 } from @tailwind-dynamic-classes; 
```

React component

```jsx

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
};

const colors = [
    "red", "orange", "yellow",
    "green", "blue", "purple"
];

const Flag = ({ colors }) => {
    return (
        <> 
         {colors.map(color => {
             <Stripe {...{ color }}>
         })}
        </>
    );
};

const Stripe = (color) => {
    return (
        <div className={classNames(bgColor500[color], "w-full h-40")}></div>
    )
};
```

You can also use these directly:

```jsx
import { textColor900, mdTextColor700 } from @tailwind-dynamic-classes;

const red = textColor900.red; // "text-color-red-900"
const blue = mdTextColor700.blue; // "md:text-color-blue-700"

```





