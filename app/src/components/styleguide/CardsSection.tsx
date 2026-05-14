import { Section } from "./Section";
import { Card, FrameLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DogPhoto } from "@/components/dogworld/DogPhoto";
import { Tag } from "@/components/dogworld/Tag";
import {
  DogProfileCard,
  LitterCard,
  EventCard,
  NewsCard,
} from "@/components/dogworld/Cards";

export function CardsSection() {
  return (
    <Section
      id="cards"
      label="08 · Components"
      title="Cards"
      description="Kort er stille beholdere. De får elevasjon gjennom kantlinjer og tynneste mulige skygge. Seks oppskrifter: generisk, bilde, hund-profil, kull, hendelse, nyhet."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Generic */}
        <div>
          <FrameLabel>Generisk</FrameLabel>
          <Card>
            <h4 className="m-0 mb-1 text-lg font-semibold tracking-[-0.01em]">
              Vaksinasjons-plan
            </h4>
            <p className="m-0 mb-3 text-sm text-n-700">
              Kull C når uke 6 den 26. mai. DHPPi-1 er på trappene.
            </p>
            <Button variant="secondary" size="sm">
              Åpne plan
            </Button>
          </Card>
        </div>

        {/* Image */}
        <div>
          <FrameLabel>Bilde-kort</FrameLabel>
          <Card flush>
            <DogPhoto
              tone="elkhound"
              label="VALP · UKE 4"
              aspect="4 / 3"
              className="rounded-b-none"
            />
            <div className="p-4">
              <h4 className="m-0 mb-1 text-lg font-semibold tracking-[-0.01em]">
                Kull C — dag 28
              </h4>
              <p className="m-0 text-sm text-n-700">
                Øynene har åpnet seg · første myk-mat-test.
              </p>
            </div>
          </Card>
        </div>

        {/* Dog profile */}
        <div>
          <FrameLabel>Hund-profil</FrameLabel>
          <DogProfileCard
            titles="NUCH NORDUCH"
            name="Astor av Granheim"
            meta={
              <>
                Norsk Elghund · <b className="text-n-700 font-medium">♂ 4 år</b>{" "}
                · far
              </>
            }
            tone="sire"
            tags={
              <>
                <Tag variant="success" dot>
                  Helse klar
                </Tag>
                <Tag variant="breed">Elghund</Tag>
              </>
            }
          />
        </div>

        {/* Litter */}
        <div>
          <FrameLabel>Kull-kort</FrameLabel>
          <LitterCard
            title="Kull C"
            poetic="Stars of the Fjord"
            sub="Født 14. apr 2026 · Astor × Bella"
            weekTag="Uke 4"
            currentWeek={4}
            counts={{ puppies: 5, males: 3, females: 2, reserved: 2 }}
          />
        </div>

        {/* Event */}
        <div>
          <FrameLabel>Hendelse-kort</FrameLabel>
          <EventCard
            day={26}
            month="MAI"
            title="DHPPi-1 · Kull C"
            meta="Veterinærklinikken Lillehammer · 10:30"
            tags={
              <>
                <Tag variant="warning" dot>
                  Om 12 dager
                </Tag>
                <Tag>Vaksinasjon</Tag>
              </>
            }
          />
        </div>

        {/* News */}
        <div>
          <FrameLabel>Nyhet-kort</FrameLabel>
          <NewsCard
            title="Bobby tar Best in Show på NKK Bergen"
            excerpt="Charmant Bobby tok BIS-1 i søndagens gruppe-finale, dømt av Maria Lindgren."
            source="Hundesport · NKK"
            date="10. mai 2026"
          />
        </div>
      </div>
    </Section>
  );
}
