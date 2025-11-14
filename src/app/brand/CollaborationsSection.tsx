'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import GlareHover from './GlareHover';
import FadeInSection from './FadeInSection';
import { ArrowRight, PlayCircle } from 'lucide-react';

const collaborations = [
  {
    brand: 'You B Tech AI',
    description: 'Developed an AI-powered content generation tool.',
    videoId: 'pQtqtDueGec',
  },
  {
    brand: 'Lovart AI',
    description: 'AI Image generation platform collaboration.',
    videoId: 'yNYspBQNrcc',
  },
  {
    brand: 'TestSprite',
    description: 'AI-driven unit testing tool integration.',
    videoId: 'sqC4K52fbkw',
  },
  {
    brand: 'Storm MCP',
    description: 'Minecraft server management platform feature.',
    videoId: 'fniHbiW26ic',
  },
  {
    brand: 'TRAE',
    description: 'AI-powered social media content automation.',
    videoId: 'RxRMmOM3yPo',
  },
  {
    brand: '10+ More Collaborations',
    description: 'Explore more successful partnerships on our channel.',
    videoId: '', // Will link to the channel directly
    channelLink: 'https://youtube.com/@you_b_tech'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const CollaborationsSection = () => {
  return (
    <FadeInSection>
      <section id="portfolio" className="py-20 px-4 bg-card border-y border-border">
        <div className="container mx-auto">
          <h2 className="text-center font-headline text-4xl font-bold mb-12">Past Collaborations</h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {collaborations.map((collab) => (
              <motion.div key={collab.brand} variants={itemVariants}>
                <a href={collab.channelLink || `https://youtu.be/${collab.videoId}`} target="_blank" rel="noopener noreferrer" className="block h-full group">
                  <GlareHover>
                    <div className="bg-background rounded-2xl overflow-hidden h-full flex flex-col transition-shadow duration-300 hover:shadow-2xl">
                      <div className="relative w-full aspect-video overflow-hidden">
                        {collab.videoId ? (
                          <>
                            <Image
                              src={`https://i.ytimg.com/vi/${collab.videoId}/hqdefault.jpg`}
                              alt={`Thumbnail for ${collab.brand} collaboration`}
                              layout="fill"
                              objectFit="cover"
                              className="transition-transform duration-500 group-hover:scale-110"
                            />
                             <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <PlayCircle className="w-16 h-16 text-white/80 transform transition-transform duration-300 group-hover:scale-110" />
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <ArrowRight className="w-16 h-16 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="font-bold text-lg mb-2">{collab.brand}</h3>
                        <p className="text-sm text-muted-foreground flex-grow">{collab.description}</p>
                      </div>
                    </div>
                  </GlareHover>
                </a>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-12">
            <a href="https://youtube.com/@you_b_tech" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">
              For more collaborations, visit our YouTube channel <ArrowRight className="inline-block w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default CollaborationsSection;
