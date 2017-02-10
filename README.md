# NodeCreationObserverJS

## Use cases

### 1: Apply a callback each time a type of node is created

Fire a callback each time an element that matches the selector is created.
Don't apply the callback for the same element multiple times.
In this case, the ```removeOnFirstMatch``` property should be set to false.

### 2: Wait for the creation of one node and apply a callback

Fire a callback when the first element that matches the selector is created.
In this case, the ```removeOnFirstMatch``` property should be set to true.

## Definition

```javascript
// Add a new callback for a selector
NodeCreationObserver.onCreation(
  String selector,
  function callback,
  boolean removeOnFirstMatch (optionnal, default value: false)
);

// Stop observing a selector 
NodeCreationObserver.remove(
  String selector
);

// Stop observing all the selectors
NodeCreationObserver.stop();
```

## Usage

```javascript
// (optional)
// Change the attribute that will be used to mark a node as observed
NodeCreationObserver.init("observed-attribute");

// Use case 1
NodeCreationObserver.onCreation("MY_SELECTOR", function (element) {
    // callback body
});

// Use case 2
NodeCreationObserver.onCreation("#my_element_id", function (element) {
    // callback body
}, true);

// When observing "MY_SELECTOR" is no longer needed
NodeCreationObserver.remove("MY_SELECTOR");
    
// When node observing is no longer needed
NodeCreationObserver.stop();
```

## Implementation

Based on the [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) API
