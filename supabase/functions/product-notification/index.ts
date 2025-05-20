
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ProductEmailRequest {
  product: {
    id: string;
    name: string;
    price: string;
    description: string | null;
    image_url: string | null;
    category?: string;
  };
  action: "created" | "updated";
  notifyEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { product, action, notifyEmail }: ProductEmailRequest = await req.json();
    
    if (!product || !action || !notifyEmail) {
      throw new Error("Missing required fields");
    }

    const actionText = action === "created" ? "added" : "updated";
    const subject = `Product ${actionText}: ${product.name}`;
    
    const emailResponse = await resend.emails.send({
      from: "Sawmill Products <notifications@sawmill.store>", // Replace with your verified domain
      to: [notifyEmail],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Product ${actionText}</h2>
          <p>A product has been ${actionText} in your inventory:</p>
          
          <div style="border: 1px solid #e0e0e0; border-radius: 5px; padding: 15px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #4a4a4a;">${product.name}</h3>
            
            ${product.image_url ? 
              `<img src="${product.image_url}" alt="${product.name}" style="max-width: 200px; max-height: 200px; margin-bottom: 10px;">` : 
              ''}
            
            <p><strong>Category:</strong> ${product.category || 'Uncategorized'}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            ${product.description ? 
              `<p><strong>Description:</strong> ${product.description}</p>` : 
              ''}
          </div>
          
          <p>You can view and manage all products in the <a href="https://yourdomain.com/admin/products" style="color: #8B4513; text-decoration: underline;">admin dashboard</a>.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #888;">
            <p>This is an automated notification from your Sawmill inventory system.</p>
          </div>
        </div>
      `,
    });

    console.log("Product notification email sent:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in product-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
