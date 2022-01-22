# Tailwind Dynamic Classes 

[![CircleCI](https://circleci.com/gh/matt-d-webb/tailwind-dynamic-classes/tree/master.svg?style=svg)](https://circleci.com/gh/matt-d-webb/tailwind-dynamic-classes/tree/master)

A utility library for dynamically using tailwind css color classes

## `text-${color}-500   ` ❌

## `textColor500[color]  ` ✅

Example usage:


```js
import { bgColor500 } from "tailwind-dynamic-classes"; 
```

React component example:

```jsx

const classNames = (...classes) => {
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
import { textColor900, mdTextColor700 } from "tailwind-dynamic-classes";

// "text-color-red-900"
const red = textColor900.red;

// "md:text-color-blue-700"
const blue = mdTextColor700.blue; 

```

Includes `theme` and `screen` classes:

```jsx 
import { darkBgColor200, mdBorderColor50 } from "tailwind-dynamic-classes";
```

```js
// dark:bg-color-grey-200"
console.log(darkBgColor200.grey);

// md:bg-color-orange-200"
console.log(darkBgColor200.orange);
```


**Limitations**

This does not support custom color pallette names defined in your `tailwind.config.js` file.

