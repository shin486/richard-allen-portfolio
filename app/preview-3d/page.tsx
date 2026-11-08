import { Metadata } from "next";
import { WarmStudioHero3D } from "@/components/preview/WarmStudioHero3D";

export const metadata: Metadata = {
  title: "Warm 3D Studio Prototype (Tamal Sen Aesthetic) | Richard Allen Liman",
  description:
    "Experimental dark-mode 3D studio hero section featuring matte charcoal geometric meshes, warm amber rim lighting, and code-comment navigation.",
};

export default function Preview3DPage() {
  return <WarmStudioHero3D />;
}
