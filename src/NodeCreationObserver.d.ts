/**
 * https://github.com/soufianesakhi/node-creation-observer-js
 * MIT licensed
 * Copyright (c) 2016 Soufiane Sakhi
 */

interface NodeCreationObserverStatic {
    /**
     * Add a new callback for a selector. The created element will be passed as the first parameter of the callback
     */
    onCreation: (selector: string, callback: (element: Element) => void, removeOnFirstMatch?: boolean) => void;
    
    /**
     * Stop observing a selector
     */
    remove: (selector: string) => void;
    
    /**
     * Stop observing all the selectors
     */
    stop: () => void;
}

declare var NodeCreationObserver: NodeCreationObserverStatic;