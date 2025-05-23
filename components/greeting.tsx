import { motion } from 'framer-motion';
import { WandSparkles } from 'lucide-react';
import CountryFlag from 'react-country-flag';

export const Greeting = () => {
  return (
    <div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20 px-8 size-full flex flex-col justify-center"
    >
      <div className="flex w-full max-w-[var(--thread-max-width)] grow flex-col">
        <div className="flex w-full grow flex-col items-center justify-center space-y-12 py-20">
          <div className="flex flex-col items-center space-y-6">
            {/* Creative Logo Presentation - No circular base, larger icon, direct shine */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.1 }}
              className="relative size-24 flex items-center justify-center overflow-hidden mb-1"
            >
              {/* Futuristic Silver Glint Animation for Icon */}
              <motion.span
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 5,
                  ease: 'linear',
                }}
                className="absolute inset-[-150%]
                           bg-gradient-to-r 
                           from-transparent from-45% 
                           via-white/70 via-50%
                           to-transparent to-55%"
              />
              <WandSparkles
                size={64}
                strokeWidth={1.5}
                className="relative z-10 text-black dark:text-white"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-100 relative overflow-hidden pt-1"
            >
              Compliance Copilot
              {/* Futuristic Silver Glint Animation for Title - Slower */}
              <motion.span
                initial={{ x: '100%' }}
                animate={{ x: '-100%' }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 5,
                  ease: 'linear',
                }}
                className="absolute inset-[-150%]
                           bg-gradient-to-r 
                           from-transparent from-45% 
                           via-gray-100/40 via-50% 
                           to-transparent to-55%"
              />
            </motion.h2>

            {/* Elegant, thin silver divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{ delay: 0.3 }}
              className="h-px w-36 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-2"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.4 }}
              className="text-center text-base text-gray-500 dark:text-gray-400 max-w-[340px]"
            >
              Expert guidance on SAMA regulations for Financial Institutions
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 0.8, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{
                delay: 0.5,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1], // Custom bezier curve for smooth animation
              }}
              whileHover={{
                opacity: 1,
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              className="mt-3 relative"
            >
              <CountryFlag
                countryCode="SA"
                svg
                style={{
                  width: '4em',
                  height: '4em',
                  willChange: 'transform', // Helps with rendering performance
                }}
                title="Saudi Arabia"
              />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.6 }}
            className="font-medium text-gray-600 dark:text-gray-300 text-center relative inline-block group mt-8"
          >
            How may I assist you today?
            <span className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent group-hover:w-full transition-all duration-500 ease-out" />
          </motion.p>
        </div>
      </div>
    </div>
  );
};
