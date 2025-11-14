'use client';

import Image from 'next/image';
import GlareHover from './GlareHover';
import FadeInSection from './FadeInSection';
import { ArrowRight } from 'lucide-react';

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

const CollaborationsSection = () => {
  return (
    <FadeInSection>
      <section id="portfolio" className="py-20 px-4 bg-card border-y border-border">
        <div className="container mx-auto">
          <h2 className="text-center font-headline text-4xl font-bold mb-12">Past Collaborations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collaborations.map((collab) => (
              <a key={collab.brand} href={collab.channelLink || `https://youtu.be/${collab.videoId}`} target="_blank" rel="noopener noreferrer">
                <GlareHover>
                  <div className="bg-background rounded-2xl overflow-hidden h-full flex flex-col">
                    {collab.videoId && (
                      <div className="relative w-full aspect-video">
                        <Image
                          src={`https://img.youtube.com/vi/${collab.videoId}/hqdefault.jpg`}
                          alt={`Thumbnail for ${collab.brand} collaboration`}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="font-bold text-lg mb-2">{collab.brand}</h3>
                      <p className="text-sm text-muted-foreground flex-grow">{collab.description}</p>
                      {collab.channelLink && (
                        <div className="mt-4 text-accent font-semibold flex items-center">
                          View All <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      )}
                    </div>
                  </div>
                </GlareHover>
              </a>
            ))}
          </div>
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
