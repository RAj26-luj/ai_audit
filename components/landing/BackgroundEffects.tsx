// animated background blobs
import {
  motion,
  useTransform,
} from "framer-motion";

type Props = {
  mouseXSpring: any;
  mouseYSpring: any;
};

export default function BackgroundEffects({
  mouseXSpring,
  mouseYSpring,
}: Props) {

  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden">

        {/* indigo */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 60, 0],
          }}

          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}

          style={{
            translateX: useTransform(
              mouseXSpring,
              [-0.5, 0.5],
              [100, -100]
            ),

            translateY: useTransform(
              mouseYSpring,
              [-0.5, 0.5],
              [100, -100]
            ),
          }}

          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full"
        />

        {/* purple */}
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 80, -30, 0],
          }}

          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}

          style={{
            translateX: useTransform(
              mouseXSpring,
              [-0.5, 0.5],
              [-150, 150]
            ),

            translateY: useTransform(
              mouseYSpring,
              [-0.5, 0.5],
              [-150, 150]
            ),
          }}

          className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-purple-600/10 blur-[150px] rounded-full"
        />

        {/* center */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}

          transition={{
            duration: 8,
            repeat: Infinity,
          }}

          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full"
        />
      </div>

      {/* noise */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </>
  );
}