import type { StaticImageData } from "next/image";
import p_amsterdam from "../../public/photography/amsterdam.jpg";
import p_barcelona from "../../public/photography/barcelona.jpg";
import p_barcelona12 from "../../public/photography/barcelona12.jpg";
import p_barcelona15 from "../../public/photography/barcelona15.jpg";
import p_barcelona18 from "../../public/photography/barcelona18.jpg";
import p_barcelona3 from "../../public/photography/barcelona3.jpg";
import p_barcelona4 from "../../public/photography/barcelona4.jpg";
import p_barcelona8 from "../../public/photography/barcelona8.jpg";
import p_barcelona9 from "../../public/photography/barcelona9.jpg";
import p_bilbao12 from "../../public/photography/bilbao12.jpg";
import p_bilbao2 from "../../public/photography/bilbao2.jpg";
import p_bilbao3 from "../../public/photography/bilbao3.jpg";
import p_bilbao4_1 from "../../public/photography/bilbao4-1.jpg";
import p_bilbao4 from "../../public/photography/bilbao4.jpg";
import p_bilbao6 from "../../public/photography/bilbao6.jpg";
import p_bilbao8 from "../../public/photography/bilbao8.jpg";
import p_bilbao9 from "../../public/photography/bilbao9.jpg";
import p_bordeaux from "../../public/photography/bordeaux.jpg";
import p_brussels5 from "../../public/photography/brussels5.jpg";
import p_budapest from "../../public/photography/budapest.jpg";
import p_dingle from "../../public/photography/dingle.jpg";
import p_dingle2 from "../../public/photography/dingle2.jpg";
import p_dubai from "../../public/photography/dubai.jpg";
import p_ghent from "../../public/photography/ghent.jpg";
import p_ghent2 from "../../public/photography/ghent2.jpg";
import p_ireland_1 from "../../public/photography/ireland-1.jpg";
import p_ireland_2 from "../../public/photography/ireland-2.jpg";
import p_ireland_3 from "../../public/photography/ireland-3.jpg";
import p_killarney from "../../public/photography/killarney.jpg";
import p_killarney5 from "../../public/photography/killarney5.jpg";
import p_london1 from "../../public/photography/london1.jpg";
import p_london2 from "../../public/photography/london2.jpg";
import p_london5 from "../../public/photography/london5.jpg";
import p_madrid from "../../public/photography/madrid.jpg";
import p_mallorca_10 from "../../public/photography/mallorca-10.jpg";
import p_mallorca_11 from "../../public/photography/mallorca-11.jpg";
import p_mallorca_2 from "../../public/photography/mallorca-2.jpg";
import p_mallorca_4 from "../../public/photography/mallorca-4.jpg";
import p_mallorca_5 from "../../public/photography/mallorca-5.jpg";
import p_mallorca_6 from "../../public/photography/mallorca-6.jpg";
import p_mallorca_7 from "../../public/photography/mallorca-7.jpg";
import p_mallorca_8 from "../../public/photography/mallorca-8.jpg";
import p_mallorca_9 from "../../public/photography/mallorca-9.jpg";
import p_mallorca from "../../public/photography/mallorca.jpg";
import p_mallorca13 from "../../public/photography/mallorca13.jpg";
import p_mallorca15 from "../../public/photography/mallorca15.jpg";
import p_mississauga from "../../public/photography/mississauga.jpg";
import p_mississauga2 from "../../public/photography/mississauga2.jpg";
import p_netherlands2 from "../../public/photography/netherlands2.jpg";
import p_nida from "../../public/photography/nida.jpg";
import p_nyc from "../../public/photography/nyc.jpg";
import p_paris from "../../public/photography/paris.jpg";
import p_picos_de_europa from "../../public/photography/picos-de-europa.jpg";
import p_picos_de_europa1 from "../../public/photography/picos-de-europa1.jpg";
import p_picos_de_europa2 from "../../public/photography/picos-de-europa2.jpg";
import p_picos_de_europa4 from "../../public/photography/picos-de-europa4.jpg";
import p_picos_de_europa5 from "../../public/photography/picos-de-europa5.jpg";
import p_bilbao19 from "../../public/photography/bilbao19.jpg";
import p_saudi_arabia_1 from "../../public/photography/saudi-arabia-1.jpg";
import p_saudi_arabia_3 from "../../public/photography/saudi-arabia-3.jpg";
import p_saudi_arabia from "../../public/photography/saudi-arabia.jpg";
import p_scotland_2 from "../../public/photography/scotland-2.jpg";
import p_scotland_3 from "../../public/photography/scotland-3.jpg";
import p_scotland_4 from "../../public/photography/scotland-4.jpg";
import p_scotland from "../../public/photography/scotland.jpg";
import p_tobermory from "../../public/photography/tobermory.jpg";
import p_tobermory2 from "../../public/photography/tobermory2.jpg";
import p_tobermory3 from "../../public/photography/tobermory3.jpg";
import p_tobermory4 from "../../public/photography/tobermory4.jpg";
import p_vitoria from "../../public/photography/vitoria.jpg";
import p_wales_2 from "../../public/photography/wales-2.jpg";
import p_wales_3 from "../../public/photography/wales-3.jpg";
import p_wales_4 from "../../public/photography/wales-4.jpg";
import p_wales_5 from "../../public/photography/wales-5.jpg";
import p_wales from "../../public/photography/wales.jpg";
import p_wexford1 from "../../public/photography/wexford1.jpg";
import p_zaandam from "../../public/photography/zaandam.jpg";
import p_zaandam2 from "../../public/photography/zaandam2.jpg";
import p_biarritz from "../../public/photography/biarritz.jpg";
import p_westport_ireland from "../../public/photography/westport-ireland.jpg";
import p_brussels from "../../public/photography/brussels.jpg";
import p_paris3 from "../../public/photography/paris3.jpg";
import p_spain from "../../public/photography/spain.jpg";
import p_spain_1 from "../../public/photography/spain-1.jpg";
import p_spain2 from "../../public/photography/spain2.jpg";
import p_spain6 from "../../public/photography/spain6.jpg";
import p_spain9 from "../../public/photography/spain9.jpg";

// Web-sized copies (2000px max, rotation applied) live in public/photography/.
// The wall shuffles these so the same country never sits side by side, so order here doesn't matter.

export type Shot = {
  image: StaticImageData;
  /** Leave out when unknown; the label falls back to just the country. */
  city?: string;
  /** Shown instead of the country, e.g. "Basque Country". The layout still groups by country. */
  region?: string;
  country: string;
};

export const photos: Shot[] = [
  { image: p_amsterdam, city: "Amsterdam", country: "Netherlands" },
  { image: p_barcelona, city: "Barcelona", country: "Spain" },
  { image: p_barcelona12, city: "Barcelona", country: "Spain" },
  { image: p_barcelona15, city: "Barcelona", country: "Spain" },
  { image: p_barcelona18, city: "Barcelona", country: "Spain" },
  { image: p_barcelona3, city: "Barcelona", country: "Spain" },
  { image: p_barcelona4, city: "Barcelona", country: "Spain" },
  { image: p_barcelona8, city: "Barcelona", country: "Spain" },
  { image: p_barcelona9, city: "Barcelona", country: "Spain" },
  { image: p_bilbao12, city: "Bilbao", region: "Basque Country", country: "Spain" },
  { image: p_bilbao2, city: "Bilbao", region: "Basque Country", country: "Spain" },
  { image: p_bilbao3, city: "Bilbao", region: "Basque Country", country: "Spain" },
  { image: p_bilbao4_1, city: "Bilbao", region: "Basque Country", country: "Spain" },
  { image: p_bilbao4, city: "Bilbao", region: "Basque Country", country: "Spain" },
  { image: p_bilbao6, city: "Bilbao", region: "Basque Country", country: "Spain" },
  { image: p_bilbao8, city: "Bilbao", region: "Basque Country", country: "Spain" },
  { image: p_bilbao9, city: "Bilbao", region: "Basque Country", country: "Spain" },
  { image: p_bordeaux, city: "Bordeaux", country: "France" },
  { image: p_brussels5, city: "Brussels", country: "Belgium" },
  { image: p_budapest, city: "Budapest", country: "Hungary" },
  { image: p_dingle, city: "Dingle", country: "Ireland" },
  { image: p_dingle2, city: "Dingle", country: "Ireland" },
  { image: p_dubai, city: "Dubai", country: "UAE" },
  { image: p_ghent, city: "Ghent", country: "Belgium" },
  { image: p_ghent2, city: "Ghent", country: "Belgium" },
  { image: p_ireland_1, city: "Achill Island", country: "Ireland" },
  { image: p_ireland_2, city: "Achill Island", country: "Ireland" },
  { image: p_ireland_3, city: "Achill Island", country: "Ireland" },
  { image: p_killarney, city: "Killarney", country: "Ireland" },
  { image: p_killarney5, city: "Killarney", country: "Ireland" },
  { image: p_london1, city: "London", country: "England" },
  { image: p_london2, city: "London", country: "England" },
  { image: p_london5, city: "London", country: "England" },
  { image: p_madrid, city: "Madrid", country: "Spain" },
  { image: p_mallorca_10, city: "Deià", region: "Mallorca", country: "Spain" },
  { image: p_mallorca_11, city: "Deià",region: "Mallorca", country: "Spain" },
  { image: p_mallorca_2, city: "Mallorca", country: "Spain" },
  { image: p_mallorca_4, city: "Deià", region: "Mallorca",country: "Spain" },
  { image: p_mallorca_5, city: "Mallorca", country: "Spain" },
  { image: p_mallorca_6, city: "Mallorca", country: "Spain" },
  { image: p_mallorca_7, city: "Mallorca", country: "Spain" },
  { image: p_mallorca_8, city: "Deià", region: "Mallorca", country: "Spain" },
  { image: p_mallorca_9, city: "Mallorca", country: "Spain" },
  { image: p_mallorca, city: "Sóller", region: "Mallorca", country: "Spain" },
  { image: p_mallorca13, city: "Mallorca", country: "Spain" },
  { image: p_mallorca15, city: "Deià", region: "Mallorca", country: "Spain" },
  { image: p_mississauga, city: "Mississauga", country: "Canada" },
  { image: p_mississauga2, city: "Mississauga", country: "Canada" },
  { image: p_netherlands2, city: "Zaanse Schans", country: "Netherlands" },
  { image: p_nida, city: "Nida", country: "Lithuania" },
  { image: p_nyc, city: "New York", country: "USA" },
  { image: p_paris, city: "Paris", country: "France" },
  { image: p_picos_de_europa, city: "Picos de Europa", country: "Spain" },
  { image: p_picos_de_europa1, city: "Picos de Europa", country: "Spain" },
  { image: p_picos_de_europa2, city: "Picos de Europa", country: "Spain" },
  { image: p_picos_de_europa4, city: "Picos de Europa", country: "Spain" },
  { image: p_picos_de_europa5, city: "Picos de Europa", country: "Spain" },
  { image: p_bilbao19, city: "Bilbao", region: "Basque Country", country: "Spain" },
  { image: p_saudi_arabia_1, city: "Riyadh", country: "Saudi Arabia" },
  { image: p_saudi_arabia_3, city: "Riyadh", country: "Saudi Arabia" },
  { image: p_saudi_arabia, city: "Riyadh", country: "Saudi Arabia" },
  { image: p_scotland_2, city: "Edinburgh", country: "Scotland" },
  { image: p_scotland_3, city: "Edinburgh", country: "Scotland" },
  { image: p_scotland_4, city: "Edinburgh", country: "Scotland" },
  { image: p_scotland, city: "Edinburgh", country: "Scotland" },
  { image: p_tobermory, city: "Tobermory", country: "Canada" },
  { image: p_tobermory2, city: "Tobermory", country: "Canada" },
  { image: p_tobermory3, city: "Tobermory", country: "Canada" },
  { image: p_tobermory4, city: "Tobermory", country: "Canada" },
  { image: p_vitoria, city: "Vitoria-Gasteiz", region: "Basque Country", country: "Spain" },
  { image: p_wales_2, city: "Fishguard", country: "Wales" },
  { image: p_wales_3, city: "Fishguard", country: "Wales" },
  { image: p_wales_4, city: "Fishguard", country: "Wales" },
  { image: p_wales_5, city: "Fishguard", country: "Wales" },
  { image: p_wales, city: "Fishguard", country: "Wales" },
  { image: p_wexford1, city: "Wexford", country: "Ireland" },
  { image: p_zaandam, city: "Zaanse Schans", country: "Netherlands" },
  { image: p_zaandam2, city: "Zaandam", country: "Netherlands" },
  { image: p_biarritz, city: "Biarritz", country: "France" },
  { image: p_westport_ireland, city: "Westport", country: "Ireland" },
  { image: p_brussels, city: "Brussels", country: "Belgium" },
  { image: p_paris3, city: "Paris", country: "France" },
  { image: p_spain, country: "Spain" }, // [city?]
  { image: p_spain_1, country: "Spain" }, // [city?]
  { image: p_spain2, country: "Spain" }, // [city?]
  { image: p_spain6, city: "Cudillero", country: "Spain" }, // [city?]
  { image: p_spain9, country: "Spain" }, // [city?]
];

/** "Barcelona, Spain", or just the country when the city isn't known. */
export function placeOf(shot: Shot) {
  const area = shot.region ?? shot.country;
  return shot.city ? `${shot.city}, ${area}` : area;
}

/** Shown first, in this order, at the top of the wall. Everything else is arranged after them. */
export const featured: StaticImageData[] = [
  p_amsterdam,
  p_ireland_2,
  p_bilbao4,
  p_spain6,
  p_mallorca15,
  p_budapest,
  p_wales_5,
  p_zaandam,
  p_tobermory,
  p_scotland_4,
  p_picos_de_europa5,
  p_netherlands2,
  p_mississauga,
];

export const instagramUrl = "https://www.instagram.com/noraenroute/";
