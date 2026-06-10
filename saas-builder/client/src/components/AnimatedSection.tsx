import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

function AnimatedSection({ children }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 50, }}
      whileInView={{ opacity: 1, y: 0, }}
      viewport={{ once: true, amount: 0.15, }}
      transition={{ duration: 0.7, }}
    >
      {children}
    </motion.div>
  );
}
export default AnimatedSection;