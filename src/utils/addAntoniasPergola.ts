
import { createProject } from '@/api/adminProjectApi';

export async function addAntoniasPergola() {
  try {
    const project = await createProject({
      title: "Antonia's Pergola",
      description: "A stunning outdoor pergola structure crafted from premium white pine lumber. Features massive 12x12 supporting beams and traditional lattice work overhead. This beautiful outdoor living space provides the perfect blend of shelter and open-air ambiance, showcasing the natural beauty and strength of white pine construction. The pergola creates an inviting space for outdoor dining and relaxation while demonstrating expert timber framing techniques.",
      image_url: "/lovable-uploads/6a52ecd5-44a6-42cc-b309-7650be549f3d.png",
      wood_type: "White Pine",
      category: "Outdoor Structures"
    });
    
    console.log("Antonia's pergola project added successfully:", project);
    return project;
  } catch (error) {
    console.error("Error adding Antonia's pergola project:", error);
    throw error;
  }
}
