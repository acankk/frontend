import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AdminHeader({
  title,
  buttonText,
  onClick,
  icon: Icon = Plus,
}) {
  return (
    <div className="flex items-center justify-between mb-8">

      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      {buttonText && (
        <Button
          onClick={onClick}
          className="gap-2 bg-white/10 hover:bg-violet-500"
        >
          <Icon size={18} />
          {buttonText}
        </Button>
      )}

    </div>
  );
}