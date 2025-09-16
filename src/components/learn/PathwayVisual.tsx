import diverseSupport from "@/assets/diverse-community-support.jpg";
import diverseLearning from "@/assets/diverse-learning-environment.jpg"; 
import diverseSuccess from "@/assets/diverse-success-stories.jpg";

export const PathwayVisual = ({ pathway }: { pathway: string }) => {
  const getImage = () => {
    switch (pathway) {
      case "community":
        return diverseSupport;
      case "learning": 
        return diverseLearning;
      case "success":
        return diverseSuccess;
      default:
        return diverseLearning;
    }
  };

  const getAlt = () => {
    switch (pathway) {
      case "community":
        return "Diverse group of people in supportive community circle";
      case "learning":
        return "Diverse adults learning together in modern educational environment";
      case "success":
        return "Professional portraits of diverse individuals representing success stories";
      default:
        return "Diverse learning community";
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      <img 
        src={getImage()} 
        alt={getAlt()}
        className="w-full h-48 md:h-64 object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-osu-scarlet/20 via-transparent to-transparent" />
    </div>
  );
};