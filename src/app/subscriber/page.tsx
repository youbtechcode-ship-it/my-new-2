import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FastForward, Lock, MessageCircle, ShieldOff } from 'lucide-react';
import SubscriberForm from './SubscriberForm';

const messageTypes = [
  'General message',
  'Feedback',
  'Suggestions',
  'Product questions',
  'Personal message',
];

const valuePoints = [
  {
    icon: <FastForward className="w-8 h-8 text-accent" />,
    title: 'Fast Responses',
    description: 'We prioritize your messages to ensure timely replies.',
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-accent" />,
    title: 'Direct Communication',
    description: 'Your message goes straight to the source, no intermediaries.',
  },
  {
    icon: <ShieldOff className="w-8 h-8 text-accent" />,
    title: 'No Spam Tactics',
    description: 'We respect your inbox and will only reply to your query.',
  },
  {
    icon: <Lock className="w-8 h-8 text-accent" />,
    title: 'Secure Submission',
    description: 'Your information is handled with care and privacy.',
  },
];

export default function SubscriberPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <section className="text-center">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">Connect With YBT</h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Send your message directly and get a response soon.
        </p>
      </section>
      
      <section className="mt-16">
        <h2 className="text-3xl font-headline font-semibold text-center mb-8">Message Types</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {messageTypes.map((type) => (
            <div key={type} className="flex items-center gap-2 bg-card p-3 rounded-lg border">
              <CheckCircle className="w-5 h-5 text-accent" />
              <span className="font-medium">{type}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-headline font-semibold text-center mb-8">Why Connect With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valuePoints.map((point) => (
            <Card key={point.title} className="text-center">
              <CardHeader className="items-center">
                <div className="p-3 bg-accent/10 rounded-full">{point.icon}</div>
                <CardTitle className="mt-4 text-xl font-body">{point.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{point.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Send Your Message</CardTitle>
          </CardHeader>
          <CardContent>
            <SubscriberForm />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
