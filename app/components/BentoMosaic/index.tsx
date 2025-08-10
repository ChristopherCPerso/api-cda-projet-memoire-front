import type { RestaurantImage } from "~/types/TypesRestaurants";

interface BentoMosaicProps {
  images: RestaurantImage[]; // On attend une prop "images" qui est un TABLEAU de RestaurantImage
}

// export function BentoMosaic({ images }: BentoMosaicProps) {
//   return images.map((link) => {
//     return (
//       <div className="grid w-full auto-rows-[150px] grid-cols-1 gap-4 lg:grid-cols-6">
//         <div className="col-span-2 row-span-2 overflow-hidden rounded-lg shadow-lg">
//           <img
//             src={link.link}
//             alt="Grande tuile"
//             className="h-full w-full object-cover transition-transform duration-300 ease-out hover:scale-110"
//           />
//         </div>
//         <div className="col-span-2 row-span-2 overflow-hidden rounded-lg shadow-lg">
//           <img
//             src={link.link}
//             alt="Grande tuile"
//             className="h-full w-full object-cover transition-transform duration-300 ease-out hover:scale-110"
//           />
//         </div>
//         <div className="col-span-1 row-span-1 overflow-hidden rounded-lg shadow-lg">
//           <img
//             src={link.link}
//             alt="Grande tuile"
//             className="h-full w-full object-cover transition-transform duration-300 ease-out hover:scale-110"
//           />
//         </div>
//         <div className="col-span-1 row-span-1 overflow-hidden rounded-lg shadow-lg">
//           <img
//             src={link.link}
//             alt="Grande tuile"
//             className="h-full w-full object-cover transition-transform duration-300 ease-out hover:scale-110"
//           />
//         </div>
//         <div className="col-span-2 row-span-1 overflow-hidden rounded-lg shadow-lg">
//           <img
//             src={link.link}
//             alt="Grande tuile"
//             className="h-full w-full object-cover transition-transform duration-300 ease-out hover:scale-110"
//           />
//         </div>
//       </div>
//     );
//   });
// }

export function BentoMosaic({ images }: { images: { link: string }[] }) {
  const getTileSizes = (count: number) => {
    // Exemple simple :
    // Pour les 2 premières images, 2x2
    // Ensuite 1x1, etc.
    const sizes = [];

    for (let i = 0; i < count; i++) {
      if (i === 0 || i === 1) {
        sizes.push({ colSpan: 2, rowSpan: 2 });
      } else if (i === count - 1) {
        sizes.push({ colSpan: 2, rowSpan: 1 });
      } else {
        sizes.push({ colSpan: 1, rowSpan: 1 });
      }
    }

    return sizes;
  };

  const sizes = getTileSizes(images.length);

  return (
    <div className="grid w-full auto-rows-[150px] grid-cols-1 gap-4 lg:grid-cols-6">
      {images.map((image, i) => (
        <div
          key={i}
          className={`overflow-hidden rounded-lg shadow-lg col-span-${[sizes[i].colSpan]} row-span-${[sizes[i].rowSpan]}`}
        >
          <img
            src={image.link}
            alt={`Image ${i + 1}`}
            className="h-full w-full object-cover transition-transform duration-300 ease-out hover:scale-110"
          />
        </div>
      ))}
    </div>
  );
}
