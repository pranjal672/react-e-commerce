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
                <button onClick={scrollUp} style={{
                    position: 'fixed',
                    bottom: "50px",
                    right: "20px",
                    fontSize: "50px",
                    height: "50px",
                    width: "50px",
                    backgroundColor: "black",
                    color: "white",
                    boxShadow: "0px 1px 5px blue"
                }}>^</button>
            )}
        </>
    )
}

export default ScrollToTop