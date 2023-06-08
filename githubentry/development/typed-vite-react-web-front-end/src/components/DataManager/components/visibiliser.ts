import { MutableRefObject, useEffect, useRef, useState } from "react";

export const useElementOnScreen = (options: any): [MutableRefObject<HTMLDivElement | null>, boolean] => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [ isVisible, setIsVisible ] = useState(false)
  
    const callbackFunction = (entries: any) => {
      const [ entry ] = entries;
      setIsVisible(entry.isIntersecting);
    }
  
    useEffect(() => {
      
      const observer = new IntersectionObserver(callbackFunction, options)
      if (containerRef.current) observer.observe(containerRef.current)
      return () => {
        if(containerRef.current) observer.unobserve(containerRef.current)
      }
    }, [containerRef, options])
  
    return [containerRef, isVisible]
}
