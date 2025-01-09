import { ChevronLeft, Construction, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Feature {
  title: string;
  description: string;
}

interface ComingSoonProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  features?: Feature[];
  expectedDate?: string;
  backLink?: string;
  backText?: string;
}

export default function ComingSoon({
  title,
  description,
  icon = <Construction className="w-6 h-6 text-primary" />,
  features = [],
  expectedDate = "Coming Soon",
  backLink = "/",
  backText = "Back to Home"
}: ComingSoonProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header Section */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="p-3 rounded-full bg-primary/10">
            {icon}
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground max-w-sm">
            {description}
          </p>
        </div>

        {/* Feature Preview */}
        <div className="space-y-4 rounded-lg border border-border/50 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Construction className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <h3 className="font-medium">Under Development</h3>
              <p className="text-sm text-muted-foreground">{expectedDate}</p>
            </div>
          </div>
          
          {features.length > 0 && (
            <ul className="space-y-3 text-sm text-muted-foreground">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">{feature.title}</div>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            asChild
          >
            <Link href={backLink} className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              {backText}
            </Link>
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            Check back soon for updates or follow our development progress.
          </p>
        </div>
      </div>
    </div>
  );
}