# NodeCreationObserverJS

## Definition

```javascript
void onCreation(
  String selector,
  function callback,
  boolean removeOnFirstMatch (optionnal, default value: false)
);
```

## Use cases

### 1: Wait for the creation of one node and apply a callback

Fire a callback when the first element that matches the selector is created.
In this case, the ```removeOnFirstMatch``` property should be set to true.

### 2: Apply a callback each time a type of node is created

Fire a callback each time an element that matches the selector is created.
Don't apply the callback for the same element multiple times.
In this case, the ```removeOnFirstMatch``` property should be set to false.

## Usage

```javascript
// Use case 1
NodeCreationObserver.onCreation("MY_SELECTOR", function (element) {
    // callback body
});

// Use case 2
NodeCreationObserver.onCreation("#my_element_id", function (element) {
    // callback body
}, true);
```

## Implementation

Based on the [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) API
