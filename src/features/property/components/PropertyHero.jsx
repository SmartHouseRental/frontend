import { MapPin, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeartButton from "@/features/favorites/components/HeartButton"

export default function PropertyHero({ property }) {

  const images = property?.images || [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAMM6XrLMSocX4QOeQRYoq0gyha06ggpgqYauKlnI1LLNUMey7yDXLjm3yVL2GJyFDxHhBTWVOZQczaj2dOWPeYyPkjj3rOk4Tve1SXVuofN3QnLzusQSi2KaN8BOKotftvebr5SXLP0Detj9HfU2rmgiJ-fb21ChQM3ZY-mrsP4ZuzzESF-tGhkm_0cFm8HlrRvk_b0XD6JLUmRgACb-hXV7Ew1Z-DqNuYf3-POZHuRQPskc3fkXdMxmdmzXV50GQdIekadOOF6BI",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC3ZV9m6_Y_LZqqQDCcexhsL2gN5GMgnT_u4XBoRKz87AK3aOC3IA73QOrIa1lVetpo_3M1_S7Fxs7sd6WOXXw-Xiuv-l0jFiPZW_PtEJXzb2J3VQEFNw7STvYIT15QqRrR6Z1GyktwuUI0DI-W8OqEzXDHPDmHQqdouwrLkxhtsYGu7-Jbz4r5-6SkwzarmrbaG-9RK8EVB9KU9vghd5JOR_JfodxAWQtyosVls4S73bl9oTw_Xs1vu3JcwUDJ-j_n7V7Lkzo3_wI",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA4XrFjC6G8jPQJy9wXwXZvB02f8zD-zBcQP6JUqfghInmh-Ys1H-juwpkQeHzhRLsiE0pdGW1lXWjBhan2R055x3_fRaGVmMe8Az2sLjg6eeAR1KwTuh3_Guzussue6Ig8dXHpyYhZSZ0Qn5c70DmWut5m5xa-pgjUtLA9UPkY2-0idaJozB7YXqj70Nl-xPun5FUmM5VsdwwG9svsRYDYPbnWFJjLfccZAjzK2dKnYuq7SQsitsbHB2RW7mleygwtv8yV5MCELr8",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBtLdPw51ayYBi7PBK9n9wdNNoj3fKK9QhauToGwgpmYGRPHlDG4OoLphCW9VoCWbshlD6mNlQSEM7_nuTc9daNUpiKBu-HYYD9tn-SUIkVCrcgDxcqVfsLijgkXiUAt5B4bGwbwB6ll8Sg8BgUaZ8VX-lrCQaSG3o7fIOv8ZNeqBp1tUwBCi2-bBOFOEJacAxCCRPplfyjuQ29u_VRBVYg-c4_SNt5tLLDxFPkZr_AY_poKfzjfqdJZFtMiq4Ld3qUvtMFZ2aMrLs",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDyekufEPBGBRxxKpubZTB_0ZXjzpcODHo6v6rA5JycBSjndWOW6ZO2hYI7YZzy2ETEC0OATOAeV8lshJC2OgnVKHfXtju0pF_WmYLllU2cj5rzuZO0a9H2QhF_mgsBe3_T-fR5hOvd2pGPxwuepe7OpJTe6ORTt4bdsbZEbTN7LZbbeUTJqtO5docjkTchKCMQpbDDkSuQS0Ezlk5XpSrq6St3r5cnTuDCWi6WM0XxO36m-oSVfKx4EjowEono997Bg0Ymv_hS8cM",
  ]

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Property link copied to clipboard!");
  };

  return (
    <>
      {/* Title */}
      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">

        <div>

          <div className="text-sm text-muted-foreground mb-2">
            Addis Ababa › Bole › {property?.titleStr || "Bole Atlas Villa"}
          </div>

          <h2 className="text-3xl font-extrabold">
            {property?.titleStr || "The Morning Sun Villa"}
          </h2>

          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">
              {property?.location || property?.addressStr || "Bole Atlas, Close to Edna Mall, Addis Ababa"}
            </span>
          </div>

        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="gap-2 px-6 rounded-xl border-border/60 hover:bg-muted" onClick={handleShare}>
            <Share2 size={16} /> Share
          </Button>

          <div className="relative">
            <HeartButton 
              property={property} 
              variant="outline-with-text"
              showLabel
              className="static transform-none h-10 px-6 rounded-xl border-border/60"
            />
          </div>
        </div>

      </div>

      {/* Image grid */}

      <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[500px] mb-12">

        <div className="col-span-2 row-span-2 overflow-hidden rounded-xl">
          <img src={images[0]} className="w-full h-full object-cover hover:scale-105 transition duration-500"/>
        </div>

        {images.slice(1, 5).map((img, i) => (
          <div key={i} className="overflow-hidden rounded-xl">
            <img src={img} className="w-full h-full object-cover hover:scale-105 transition duration-500"/>
          </div>
        ))}

      </div>
    </>
  )
}