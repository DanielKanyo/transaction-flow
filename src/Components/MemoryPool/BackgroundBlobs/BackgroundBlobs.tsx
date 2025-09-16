import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import classes from "./BackgroundBlobs.module.css";

const DEFAULT_NUMBER_OF_BLOBS = 32;

interface Blob {
    key: number;
    top: string;
    left: string;
    size: number;
    delay: number;
}

interface Props {
    cycle: number;
}

export default function BackgroundBlobs({ cycle }: Props) {
    const [blobs, setBlobs] = useState<Blob[]>([]);
    const [cycleKey, setCycleKey] = useState(0);

    const generateBlobs = (): Blob[] =>
        Array.from({ length: DEFAULT_NUMBER_OF_BLOBS }, (_, i) => ({
            key: i,
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            size: 20 + Math.random() * 30,
            delay: Math.random() * 0.5,
        }));

    useEffect(() => {
        // Step 1: remove existing blobs
        setBlobs([]);

        // Step 2: after exit animation, generate new blobs
        const timeout = setTimeout(() => {
            setCycleKey((k) => k + 1);
            setBlobs(generateBlobs());
        }, 400); // match exit duration

        return () => clearTimeout(timeout);
    }, [cycle]);

    return (
        <div className={classes.background}>
            <AnimatePresence>
                {blobs.map((b) => (
                    <motion.div
                        key={`${cycleKey}-${b.key}`}
                        initial={{ y: -200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 200, opacity: 0 }}
                        transition={{ duration: 0.4, delay: b.delay }}
                        style={{
                            position: "absolute",
                            top: b.top,
                            left: b.left,
                            width: b.size,
                            height: b.size,
                        }}
                    >
                        {/* Nested div for independent pulsing */}
                        <motion.div
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                backgroundColor: "rgba(103, 65, 217, 0.3)",
                            }}
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.4, 0.8, 0.4],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "loop",
                                delay: b.delay,
                            }}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
