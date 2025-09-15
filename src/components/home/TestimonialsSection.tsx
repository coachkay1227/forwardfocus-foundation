import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import testimonialSarah from "@/assets/testimonial-sarah.jpg";
import testimonialMichael from "@/assets/testimonial-michael.jpg";
import testimonialJessica from "@/assets/testimonial-jessica.jpg";

const testimonials = [
  {
    quote: "The trauma-informed approach made all the difference in my healing.",
    name: "Sarah M.",
    location: "Columbus, OH",
    avatar: testimonialSarah,
    stars: 5
  },
  {
    quote: "Finally found a community that understands what I'm going through.",
    name: "Michael R.",
    location: "Cleveland, OH", 
    avatar: testimonialMichael,
    stars: 5
  },
  {
    quote: "The AI assistant helped me find resources I didn't know existed.",
    name: "Jessica T.",
    location: "Cincinnati, OH",
    avatar: testimonialJessica,
    stars: 5
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-muted/30 to-muted/10">
      <div className="container px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Real Stories, Real Progress
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Hear from community members about their transformative experiences
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-card/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:scale-[1.02]"
            >
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={`${testimonial.name} testimonial photo`} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-osu-scarlet/20" 
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {Array.from({ length: testimonial.stars }).map((_, starIndex) => (
                    <span key={starIndex} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                
                <div className="text-osu-scarlet/20 text-4xl mb-3 leading-none" aria-hidden>
                  &quot;
                </div>
                <p className="text-base text-foreground leading-relaxed mb-4">
                  {testimonial.quote}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Heart className="h-4 w-4 text-osu-scarlet" aria-hidden />
                  <span>Verified Community Member</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};