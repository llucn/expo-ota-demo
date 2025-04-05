import React, { useContext, useEffect } from "react";
import { Href, router } from 'expo-router';
type AnyFunction = (...args: any[]) => any;

export interface NavigationHelper {
  navigateWithCallback: (options: {
    name: any;
    key?: string;
    params: any;
    merge?: boolean;
    callback: AnyFunction
  }) => void;
}

const contextRef = React.createContext(new Map<string, AnyFunction>())

function randomStringId() {
  return (new Date().getTime().toString() + Math.random().toString()).replace('.', '')
}

export function useNavigationHelper(): NavigationHelper {
  const callbackMap = useContext(contextRef)
  return {
    navigateWithCallback(options) {
      if (!options.callback) {
        throw Error('options.callback can not be null')
      }
      const id = randomStringId()
      callbackMap.set(id, options.callback)
      // console.log('params: ', {...options?.params, callbackHandle: id});
      router.navigate({
        pathname: options.name, 
        params: {
          ...options?.params, 
          callbackHandle: id,
        }
      });
    }
  }
}

export function useNavigationCallback(callbackHandle: any): AnyFunction  {
  const callbackMap = useContext(contextRef);
  const callback = callbackMap.get(callbackHandle);
  if (!callback) {
    throw Error('callback not found, check the callBackHandle:' + callbackHandle)
  }
  useEffect(() => {
    return () => {
      // clear callback object to avoid memory leak
      callbackMap.delete(callbackHandle)
    }
  }, []);
  return callback;
}
