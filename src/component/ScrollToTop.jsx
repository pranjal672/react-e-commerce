import { useState, useEffect } from 'react'

const ScrollToTop = () => {
    const [scrollToTopButton, setScrollToTopButton] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setScrollToTopButton(true)
            } else {
                setScrollToTopButton(false)
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        })
    }

    return (
        <>
            {scrollToTopButton && (
                <button onClick={scrollUp} className="scrolltotop">^</button>
            )}
        </>
    )
}

export default ScrollToTop