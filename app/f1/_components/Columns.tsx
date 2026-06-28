import { motion, MotionValue } from "motion/react"

type ColumnProps = {
    images: string[];
    y: MotionValue<number>;
};

export const Column = ({ images, y }: ColumnProps) => {
    return (
        <motion.div
            className="relative -top-[-45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
            style={{ y }}
        >
            {images.map((src, i) => (
                <div key={i} className="relative h-full w-full overflow-hidden">
                    <img
                        src={`${src}`}
                        alt="image"
                        className="pointer-events-none object-cover w-full h-full"
                    />
                </div>
            ))}
        </motion.div>
    );
};
