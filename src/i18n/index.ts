/**
 * The site is Czech only (as bsicertifikace.cz is today). The language plumbing of the other Alture Astro sites
 * is kept so a second language can be added later: add the entry to LANGS, a key to the JSON files, and a route.
 */
export const LANGS = [{ code: 'cs', locale: 'cs-CZ', og: 'cs_CZ', name: 'Čeština', short: 'CS' }] as const;

export type Lang = (typeof LANGS)[number]['code'];

export function langInfo(lang: Lang) {
  return LANGS.find((l) => l.code === lang)!;
}

/** Texts of one dictionary file ({ cs: {...} }) for one language. Missing keys fall back to Czech. */
export function pick<T>(data: Record<string, T>, lang: Lang): T {
  return { ...data.cs, ...(data[lang] ?? {}) } as T;
}

/** Pages of the live site that this front page links to (everything except the front page stays on di5-tech.cz). */
const LIVE = 'https://www.di5-tech.cz';
const FORM = 'https://app.smartemailing.cz/public/web-forms-v2/display-form/';
export const URLS = {
  reseni: `${LIVE}/reseni`,
  software: `${LIVE}/bim-software`,
  sluzby: `${LIVE}/sluzby`,
  data: `${LIVE}/bim-data`,
  poradenstvi: `${LIVE}/bim-poradenstvi`,
  reference: `${LIVE}/reference`,
  onas: `${LIVE}/o-nas`,
  klienti: `${LIVE}/o-nas#containerAboutOurClients`,
  zdroje: `${LIVE}/zdroje`,
  stazeni: `${LIVE}/zdroje#freeDownload`,
  videa: `${LIVE}/zdroje#containerSourcesLatestYouTube`,
  faq: `${LIVE}/zdroje#containerSourcesFaq`,
  kontakt: `${LIVE}/kontakt`,
  nastroj: `${LIVE}/sluzby/bim-nastroj`,
  demo: `${LIVE}/zadost-o-demo-pristup-do-aplikace-bim-point`,
  clanek: `${LIVE}/blog/rubrika-blogu/bim-model/a-co-je-vlastne-ten-bim`,
  novinky: `${LIVE}/archiv-novinek`,
  novinka: `${LIVE}/archiv-novinek/nasi-bim-konzultanti-uspesne-slozili-bsi-certifikaci`,
  newsletter: `${LIVE}/engine/plugins/di5-smartemailing-forms/form-newsletter.html`,
  bsi: 'https://bsicertifikace.cz/',
  konzultace: `${FORM}49959-z99dt7bq64br2t6ydcdhbp9dok5b56eam01k8vndlu9hzxd0075m5iwzshsaargiwggirnvqua1nkqvnm71sk1i1n6uqg231zpmi`,
  pasportizace: `${FORM}49959-0rugyawc8o2rizhgwyr9yzkvkg7un49zqw03hrgla7o8g7hxg8c8tzv6g2xki1rvq5reiqg8p3t6uuxp3oigs6uak1ipds70wbo0`,
  facebook: 'https://www.facebook.com/BimPoint-1633642646955675/',
  linkedin: 'https://www.linkedin.com/company/bim.point?trk=ppro_cprof',
  youtube: 'https://www.youtube.com/channel/UCEi6oG2J_zpNRGukwC_ODpw',
} as const;

/** Company data used in the footer and schema.org (address and phone as on bsicertifikace.cz, same Bim.Point). */
export const FIRM = {
  name: 'Bim.Point',
  site: 'di5 tech',
  street: 'Koubkova 11',
  zip: '120 00',
  city: 'Praha 2',
  office: '+420 221 590 945',
  officeHref: 'tel:+420221590945',
};
