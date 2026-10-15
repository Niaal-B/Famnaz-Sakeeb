import React from 'react';
import { MapPinIcon, ClockIcon, CalendarDaysIcon } from 'lucide-react';

const FLORAL = "/20745df0-5f10-4c3b-9e6f-a54efda97107.jpg";
const PHOTO = "/couple-photo.webp";



const MAP_URL = 'https://maps.app.goo.gl/DYMjthaDbUvKN3Rs6?g_st=ic';

function Divider() {
  return (
    <div className="flex items-center justify-center gap-2" aria-hidden="true">
      <span className="h-px w-12 bg-gold/50" />
      <span className="h-1.5 w-1.5 rotate-45 bg-crimson/70" />
      <span className="h-px w-12 bg-gold/50" />
    </div>);

}

type PersonProps = {
  role: string;
  name: string;
  lineage: React.ReactNode;
};

function Person({ role, name, lineage }: PersonProps) {
  return (
    <div>
      <p className="font-serif text-[0.65rem] uppercase tracking-[0.3em] text-crimson/70">{role}</p>
      <h2 className="mt-2 font-script text-[2.35rem] leading-[1.15] text-crimson sm:text-[2.75rem]">
        {name}
      </h2>
      <p className="mx-auto mt-2 max-w-[19rem] font-serif text-[0.85rem] leading-relaxed text-ink/80">
        {lineage}
      </p>
    </div>);

}

type EventProps = {
  title: string;
  time: string;
  place: string;
};

function EventBlock({ title, time, place }: EventProps) {
  return (
    <div className="flex-1 px-2 py-1 text-center">
      <p className="font-serif text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-crimson">
        {title}
      </p>
      <p className="mt-2 flex items-center justify-center gap-1.5 font-serif text-base font-medium text-ink">
        <ClockIcon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
        {time}
      </p>
      <p className="mt-1 font-serif text-[0.85rem] leading-snug text-ink/75">{place}</p>
    </div>);

}

export function WeddingCard() {
  return (
    <article className="relative mx-auto w-full max-w-[600px] overflow-hidden bg-cream p-2 shadow-[0_30px_60px_-25px_rgba(59,42,34,0.45)] sm:p-3">
      {/* Decorative florals */}
      <img
        src={FLORAL}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-6 w-36 select-none mix-blend-multiply sm:w-44" />
      
      <img
        src={FLORAL}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 -left-6 w-36 rotate-180 select-none mix-blend-multiply sm:w-44" />
      

      <div className="relative border border-gold/30 outline outline-1 -outline-offset-[6px] outline-gold/20">
        <div className="relative px-6 pb-14 pt-10 text-center text-ink sm:px-12 sm:pb-16 sm:pt-12">
          <p
            lang="ar"
            dir="rtl"
            className="mx-auto max-w-full break-words font-arabic text-xl leading-relaxed text-gold sm:text-2xl">
            
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>

          <p className="mt-7 font-serif text-[0.68rem] uppercase tracking-[0.34em] text-ink/60">
            Wedding Invitation
          </p>

          <h1 className="mt-4 font-serif text-[1.05rem] font-semibold leading-snug tracking-wide text-ink sm:text-lg">
            Mr. M. Muhammed Haji
            <span className="mx-1.5 font-script text-2xl font-normal text-gold">&amp;</span>
            Ayishabi
          </h1>
          <p className="mx-auto mt-2 max-w-[21rem] font-serif text-[0.85rem] italic leading-relaxed text-ink/70">
            request the honour of your presence at the wedding of
          </p>

          <div className="mt-8">
            <Person
              role="Bride"
              name="Fathimath Famnaz"
              lineage={
              <>
                  Gd/o Late Peedika Abbas Haji Mundaki
                  <br />
                  &amp; Late Aboobacker Haji
                </>
              } />
            

            <p className="my-5 font-script text-2xl text-gold">with</p>

            <Person role="Groom" name="Mohammed Sakeeb" lineage="S/o Ahmed Ali & Zainaba" />
          </div>

          

          <div className="mt-9">
            <Divider />
            <p className="mt-5 flex items-center justify-center gap-2 font-serif text-[1.75rem] font-medium tracking-[0.14em] text-crimson sm:text-[2rem]">
              <CalendarDaysIcon className="h-5 w-5 text-gold" aria-hidden="true" />
              12 · 12 · 2026
            </p>
            <p className="mt-1 font-serif text-[0.7rem] uppercase tracking-[0.3em] text-ink/60">
              Saturday
            </p>
          </div>

          <div className="mx-auto mt-7 flex max-w-[26rem] flex-col divide-y divide-gold/25 border-y border-gold/25 py-4 sm:flex-row sm:divide-x sm:divide-y-0">
            <EventBlock title="Nikah" time="4:00 PM" place="Groom's Residence" />
            <div className="h-4 sm:hidden" aria-hidden="true" />
            <EventBlock title="Reception" time="6:00 – 9:00 PM" place="Ma Manzil, Mooladukkam" />
          </div>

          <p className="mt-6 font-serif text-[0.7rem] uppercase tracking-[0.28em] text-ink/60">
            Venue
          </p>
          <p className="mt-1 font-serif text-lg font-medium text-ink">Ma Manzil, Mooladukkam</p>

          <a
            href={MAP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 border border-crimson/50 bg-cream px-5 py-2.5 font-serif text-[0.68rem] uppercase tracking-[0.24em] text-crimson transition-colors duration-150 ease-out hover:bg-crimson hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson">
            
            <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Get Directions
          </a>

          <div className="mt-10">
            <Divider />
          </div>

          {/* Couple photo, like a print tucked into the card */}
          <figure className="mx-auto mt-8 w-full max-w-[17rem] -rotate-1 border border-gold/40 bg-[#fbf7f1] p-2.5 pb-3 shadow-[0_18px_40px_-20px_rgba(59,42,34,0.45)] sm:max-w-[19rem]">
            <img
              src={PHOTO}
              alt="Fathimath Famnaz and Mohammed Sakeeb"
              width={720}
              height={900}
              loading="lazy"
              className="aspect-[4/5] w-full select-none object-cover" />
          </figure>

          <p className="mt-6 font-serif text-[0.8rem] italic tracking-wide text-ink/65">
            Your presence and prayers are our blessing
          </p>
        </div>
      </div>
    </article>);

}