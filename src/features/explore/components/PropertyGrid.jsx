import { PropertyCard } from "./PropertyCard";

const properties = [
  {
    title: "Cozy Garden Villa",
    location: "Bole, near Atlas",
    price: "ETB 65k",
    beds: "3",
    baths: "2",
    size: "220 m²",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXhs_H9p2kXgZYB2KszZLJFQ_dbyreVtqt1tVHNHCUuOSDGTcufmJlXVe10APzt6cVe2TEeX0tK5b7oo_LthmUHr8-0Yx53K3IPevMI0OwdpDnDbAj3HP17HHEfgau9Is34IzknHd8JAV4eUtSOl6ZWtkQ58yadiQz8TO_O6B3XtWG7PGY_-ZR2H0r_QD-RSzjzSsSJMnbEPrtZL9TA2-29--auAZNLZm5LNAhXUJtZsm7RcH22qsjNDmrjYNtVe6zcTci7YnrSVM",
    rating: "4.8",
    status: "Available Now",
    badge: "Exclusive",
  },
  {
    title: "Modern City Suite",
    location: "Kazanchis Square",
    price: "ETB 45k",
    beds: "2",
    baths: "2",
    size: "115 m²",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKNaqEz4S7hiwK62nEiNp6AdPh5c_zyscDMavUnhE_iTH5pSwlQkPUOQ1g7kk41c9vMRg_BJjNpvaXILcdZA88vKvaFFhmFRNdZCFbxny1sV-lgcWhqDfMagIRXjYmpM3JrBKLPSrMnQ2GRPJ3a4gxE-CxfAalxHr_QcMwNeT-ucZA7n45vR3tIQM4QwRCQuoEGy_1iXXmALH_fEmU72Zh70xI8XErmz6s-HHnxy2Z5QRoTpnZiAgsRv-lxrjX-ZZ24luSwxs4WbA",
    rating: "4.0",
    status: "Next Month",
    badge: "Featured",
  },
];

export function PropertyGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((p) => (
        <PropertyCard key={p.title} {...p} />
      ))}
    </div>
  );
}