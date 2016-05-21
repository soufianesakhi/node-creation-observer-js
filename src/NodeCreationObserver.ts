/**
 * https://github.com/soufianesakhi/node-creation-observer-js
 * MIT licensed
 * Copyright (c) 2016 Soufiane Sakhi
 */

/// <reference path="./NodeCreationObserver.d.ts" />
var NodeCreationObserver = function () : NodeCreationObserverStatic {
    var mutationObserver = null;
    var observedNodeAttribute = "node-creation-observer";
    var listeners = {};
    var options = {
        childList: true,
        subtree: true
    };

    function ListenerContext(removeOnFirstMatch) {
        this.callbacks = [];
        this.removeOnFirstMatch = removeOnFirstMatch == undefined ? false : removeOnFirstMatch;
    }

    function onMutationCallback(mutationRecordArray) {
        Object.keys(listeners).forEach(function (selector) {
            invokeCallbacks(selector);
        });
    }

    function invokeCallbacks(selector) {
        console.log("Invoke callbacks of the selector: " + selector);
        var callbacks = listeners[selector].callbacks;
        var elements = document.querySelectorAll(selector);
        var newElements = filterNewElements(elements);
        if (newElements.length > 0) {
            if (listeners[selector].removeOnFirstMatch) {
                removeListener(selector);
            }
            console.log("Number of matched new elements: " + newElements.length);
            newElements.forEach(function (element) {
                callbacks.forEach(function (callback) {
                    callback.call(element, element);
                });
            });
        }
    }

    function filterNewElements(elements) {
        var newElements = [];
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var attr = element.getAttribute(observedNodeAttribute);
            if (attr == null) {
                element.setAttribute(observedNodeAttribute, 1);
                newElements.push(element);
            }
        };
        return newElements;
    }

    function observe() {
        if (mutationObserver == null) {
            console.log("Start observing document");
            mutationObserver = new MutationObserver(onMutationCallback);
            mutationObserver.observe(document.documentElement, options);
        }
    }

    function removeListener(selector) {
        console.log("removing callback of the selector: " + selector);
        delete listeners[selector];
        if (Object.keys(listeners).length == 0) {
            stopObserving();
        }
    }

    function stopObserving() {
        if (mutationObserver != null) {
            mutationObserver.disconnect();
            mutationObserver = null;
            console.log("Stopped observing document");
        }
    }

    return {
        onCreation: (selector, callback, removeOnFirstMatch) => {
            console.log("Adding callback for selector: " + selector);
            if (!listeners[selector]) {
                listeners[selector] = new ListenerContext(removeOnFirstMatch);
            }
            listeners[selector].callbacks.push(callback);
            observe();
            if (document.querySelector(selector) != null) {
                console.log("Directly invoking callback: " + selector);
                invokeCallbacks(selector);
            }
        },
        remove: removeListener,
        stop: () => {
            listeners = {};
            stopObserving();
        }
    };
} ();
