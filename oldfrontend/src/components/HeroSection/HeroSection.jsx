import {motion} from "framer-motion";

const HeroSection = ( { prop }) => {

    return <header className="relative isolate px-6 pt-14 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl py-20">
            <motion.h1
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
                initial={{opacity: 0, y: -30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
            >
                {prop.title}
            </motion.h1>
            <motion.p
                className="mt-6 text-lg text-gray-600"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.3, duration: 0.8}}
            >
                {prop.subtitle}
            </motion.p>
        </div>
    </header>
}

export default HeroSection



// use below code to use this component
//
// <HeroSection
//     prop={{
//         title: "Donate & Make a Difference",
//         subtitle: "Even the smallest act of generosity can create a ripple effect of kindness, bringing hope and positive change to those in need.",
//     }}
// />